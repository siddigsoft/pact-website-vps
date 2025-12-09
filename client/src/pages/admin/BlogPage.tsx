import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import slugify from 'slugify';
import * as articlesApi from '@/api/articles';
import * as servicesApi from '@/api/services';
import * as projectsApi from '@/api/projects';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Checkbox
} from '@/components/ui/checkbox';
import RichTextEditor from '@/components/admin/RichTextEditor';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

// Icons
import { Plus, Pencil, Trash2, Eye, Calendar, Tag, Upload, X } from 'lucide-react';

// Blog article interface
interface BlogArticle {
  id: string | number;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  image: string | null;
  status: 'published' | 'draft';
  slug: string;
  meta_description: string | null;
  keywords: string[] | null;
  author_name: string | null;
  author_position: string | null;
  author_avatar: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  updated_by: number | null;
}

// Service and Project interfaces
interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  organization: string;
  category: string | null;
  bg_image: string | null;
  icon: string | null;
  duration: string | null;
  location: string | null;
  image: string | null;
  status: string | null;
  order_index: number | null;
  updated_at: Date;
  updated_by: number | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

export default function BlogPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<BlogArticle | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<'published' | 'draft' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorPosition, setAuthorPosition] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  
  // Services and projects states
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Categories
  const categories = [
    'Industry Insights',
    'Company News',
    'Careers',
    'Case Studies'
  ];
  
  // Fetch blog articles
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await articlesApi.getArticles(false);
      return response;
    },
    refetchOnWindowFocus: false,
  });
  
  // Get articles from API or use empty array if not loaded
  const articles: BlogArticle[] = articlesData?.data?.map(article => ({
    ...article,
    status: article.status as 'published' | 'draft',
    created_at: typeof article.created_at === 'string' ? article.created_at : article.created_at.toISOString(),
    updated_at: typeof article.updated_at === 'string' ? article.updated_at : article.updated_at.toISOString(),
    published_at: article.published_at ? (typeof article.published_at === 'string' ? article.published_at : article.published_at.toISOString()) : null
  })) || [];
  
  // Fetch services
  const { data: servicesResponse } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await servicesApi.getServices();
      return response;
    },
    refetchOnWindowFocus: false,
  });
  
  // Get services from API or use empty array
  const services: Service[] = servicesResponse?.data || [];
  
  // Fetch projects
  const { data: projectsResponse } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await projectsApi.getProjects();
      return response;
    },
    refetchOnWindowFocus: false,
  });
  
  // Get projects from API or use empty array
  const projects: Project[] = projectsResponse || [];
  
  // Fetch article services when editing
  const { data: articleServicesData } = useQuery({
    queryKey: ['articles', currentArticle?.id, 'services'],
    queryFn: async () => {
      if (!currentArticle?.id) return { success: true, data: [] };
      return await articlesApi.getArticleServices(Number(currentArticle.id));
    },
    enabled: !!currentArticle?.id && (isEditing || isViewing),
    refetchOnWindowFocus: false,
  });
  
  // Get article services
  const articleServices: Service[] = articleServicesData?.data || [];
  
  // Fetch article projects when editing
  const { data: articleProjectsData } = useQuery({
    queryKey: ['articles', currentArticle?.id, 'projects'],
    queryFn: async () => {
      if (!currentArticle?.id) return { success: true, data: [] };
      return await articlesApi.getArticleProjects(Number(currentArticle.id));
    },
    enabled: !!currentArticle?.id && (isEditing || isViewing),
    refetchOnWindowFocus: false,
  });
  
  // Get article projects
  const articleProjects: Project[] = articleProjectsData?.data || [];
  
  // Update selected services and projects when editing
  useEffect(() => {
    if (isEditing && articleServices.length > 0) {
      setSelectedServiceIds(articleServices.map(service => service.id));
    }
    
    if (isEditing && articleProjects.length > 0) {
      setSelectedProjectIds(articleProjects.map(project => project.id));
    }
  }, [articleServices, articleProjects, isEditing]);
  
  // Create article mutation
  const createArticleMutation = useMutation({
    mutationFn: async () => {
      // Validate title is a string
      if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a valid string');
      }

      const formData = new FormData();
      
      // Create data object with all blog article fields
      const articleData = {
        title: title.trim(),
        excerpt: excerpt || '',
        content,
        category,
        status,
        meta_description: metaDescription || '',
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        author_name: authorName || '',
        author_position: authorPosition || '',
        author_avatar: authorAvatar || '',
        serviceIds: selectedServiceIds,
        projectIds: selectedProjectIds
      };

      // Add the stringified data to the form
      formData.append('data', JSON.stringify(articleData));
      
      // Add image file if exists
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const data = await articlesApi.createArticle(formData);
      if (data.success) {
        toast({
          title: 'Article created successfully',
          description: 'The article has been created.',
          variant: 'default',
        });
        queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
        setIsCreating(false);
        resetForm();
      } else {
        throw new Error("Failed to create article");
      }
    },
    onError: (error) => {
      console.error('Error creating article:', error);
      toast({
        title: 'Failed to create article',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });
  
  // Update article mutation
  const updateArticleMutation = useMutation({
    mutationFn: async () => {
      if (!currentArticle) return null;
      
      // Validate title is a string
      if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a valid string');
      }
      
      const formData = new FormData();
      const articleData = {
        title: title.trim(),
        excerpt: excerpt || undefined,
        content,
        category,
        status,
        slug: slugify(title.trim(), { lower: true, strict: true }),
        meta_description: metaDescription || undefined,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        author_name: authorName || undefined,
        author_position: authorPosition || undefined,
        author_avatar: authorAvatar || undefined,
        serviceIds: selectedServiceIds,
        projectIds: selectedProjectIds
      };
      
      console.log('Updating article with data:', articleData);
      formData.append('data', JSON.stringify(articleData));
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      return await articlesApi.updateArticle(Number(currentArticle.id), formData);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
      resetForm();
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error: any) => {
      console.error('Error updating article:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update article',
        variant: 'destructive',
      });
    },
  });
  
  // Delete article mutation
  const deleteArticleMutation = useMutation({
    mutationFn: async () => {
      if (!currentArticle) return null;
      return await articlesApi.deleteArticle(Number(currentArticle.id));
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
      setIsDeleting(false);
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete article',
        variant: 'destructive',
      });
    },
  });
  
  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('');
    setImage('');
    setImageFile(null);
    setImagePreview(null);
    setStatus('draft');
    setMetaDescription('');
    setKeywords('');
    setAuthorName('');
    setAuthorPosition('');
    setAuthorAvatar('');
    setSelectedServiceIds([]);
    setSelectedProjectIds([]);
    setCurrentArticle(null);
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    setImage(''); // Clear the URL since we're using a file upload
    
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Clear uploaded image
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Toggle service selection
  const toggleService = (serviceId: number) => {
    setSelectedServiceIds(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };
  
  // Toggle project selection
  const toggleProject = (projectId: number) => {
    setSelectedProjectIds(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId) 
        : [...prev, projectId]
    );
  };
  
  // Handle view article
  const handleViewArticle = (article: BlogArticle) => {
    setCurrentArticle(article);
    setIsViewing(true);
  };
  
  // Handle edit article
  const handleEditArticle = (article: BlogArticle) => {
    setTitle(article.title);
    setExcerpt(article.excerpt || '');
    setContent(article.content);
    setCategory(article.category);
    setImage(article.image || '');
    setImagePreview(article.image || null);
    setImageFile(null);
    setStatus(article.status);
    setMetaDescription(article.meta_description || '');
    setKeywords(article.keywords ? article.keywords.join(', ') : '');
    setAuthorName(article.author_name || '');
    setAuthorPosition(article.author_position || '');
    setAuthorAvatar(article.author_avatar || '');
    setCurrentArticle(article);
    setIsEditing(true);
    
    // Services and projects will be loaded via the query effect
  };
  
  // Handle delete article
  const handleDeleteArticle = (article: BlogArticle) => {
    setCurrentArticle(article);
    setIsDeleting(true);
  };
  
  // Handle create article
  const handleCreateArticle = () => {
    createArticleMutation.mutate();
  };
  
  // Handle update article
  const handleUpdateArticle = () => {
    updateArticleMutation.mutate();
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    deleteArticleMutation.mutate();
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt?.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = !selectedStatus || article.status === selectedStatus;

      // Category filter
      const matchesCategory = !selectedCategory || article.category === selectedCategory;

      // Service filter
      const matchesService = !selectedService || 
        (articleServicesData?.data?.some(service => service.id === selectedService));

      return matchesSearch && matchesStatus && matchesCategory && matchesService;
    });
  }, [articles, searchQuery, selectedStatus, selectedCategory, selectedService, articleServicesData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('ellipsis');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('ellipsis');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus(null);
    setSelectedCategory(null);
    setSelectedService(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
        <Button 
          onClick={() => {
            resetForm();
            setIsCreating(true);
          }}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> 
          Add New Article
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <Label>Search</Label>
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={selectedStatus || 'all'}
                onValueChange={(value) => {
                  setSelectedStatus(value === 'all' ? null : value as 'published' | 'draft');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory || undefined}
                onValueChange={(value) => {
                  setSelectedCategory(value === "all" ? null : value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Service</Label>
              <Select
                value={selectedService?.toString() || undefined}
                onValueChange={(value) => {
                  setSelectedService(value === "all" ? null : Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Articles Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Articles</CardTitle>
          <CardDescription>
            Manage your website blog articles and news
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading blog articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">No blog articles found</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setIsCreating(true);
                }}
              >
                Create your first article
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>{formatDate(article.published_at || article.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewArticle(article)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditArticle(article)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteArticle(article)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((pageNumber, index) => (
                      <PaginationItem key={index}>
                        {pageNumber === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber as number);
                            }}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Create/Edit Article Dialog */}
      <Dialog open={isCreating || isEditing} onOpenChange={(open) => {
        if (!open) {
          isCreating ? setIsCreating(false) : setIsEditing(false);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Create New Article' : 'Edit Article'}</DialogTitle>
            <DialogDescription>
              {isCreating 
                ? 'Add a new blog article to your website' 
                : 'Make changes to the selected blog article'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title*</Label>
              <Input 
                id="title" 
                placeholder="Article title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt/Summary</Label>
              <Textarea 
                id="excerpt" 
                placeholder="Brief summary of the article (optional)" 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content*</Label>
              <RichTextEditor 
                value={content}
                onChange={setContent}
                placeholder="Full article content"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category*</Label>
                <Select 
                  value={category} 
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status*</Label>
                <Select 
                  value={status} 
                  onValueChange={(value: 'published' | 'draft') => setStatus(value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="grid gap-2">
              <Label>Featured Image</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
              <Input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                </div>
                {(imagePreview || image) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleClearImage}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Image Preview */}
              {(imagePreview || image) && (
                <div className="mt-2 border rounded p-2">
                  <img 
                    src={imagePreview || image} 
                    alt="Preview" 
                    className="max-h-40 max-w-full object-contain mx-auto"
                  />
                </div>
              )}
              
              {/* URL option */}
              <div className="mt-2">
                <Label htmlFor="imageUrl" className="text-sm text-gray-500">Or enter image URL</Label>
                <Input 
                  id="imageUrl" 
                  placeholder="https://..." 
                  value={!imageFile ? image : ''}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImagePreview(e.target.value);
                    setImageFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  disabled={!!imageFile}
                />
              </div>
            </div>
            
            {/* Services */}
            <div className="grid gap-2">
              <Label>Related Services</Label>
              <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                {services.length === 0 ? (
                  <p className="text-sm text-gray-500">No services available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(service => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`service-${service.id}`}
                          checked={selectedServiceIds.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <Label 
                          htmlFor={`service-${service.id}`}
                          className="text-sm cursor-pointer truncate"
                        >
                          {service.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Projects */}
            <div className="grid gap-2">
              <Label>Related Projects</Label>
              <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                {projects.length === 0 ? (
                  <p className="text-sm text-gray-500">No projects available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {projects.map(project => (
                      <div key={project.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`project-${project.id}`}
                          checked={selectedProjectIds.includes(project.id)}
                          onCheckedChange={() => toggleProject(project.id)}
                        />
                        <Label 
                          htmlFor={`project-${project.id}`}
                          className="text-sm cursor-pointer truncate"
                        >
                          {project.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* SEO Information */}
            <div className="mt-4">
              <h3 className="font-medium text-md mb-2">SEO Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    placeholder="SEO meta description" 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input 
                    id="keywords" 
                    placeholder="Comma-separated keywords" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Author Information */}
            <div className="mt-4">
              <h3 className="font-medium text-md mb-2">Author Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input 
                    id="authorName" 
                    placeholder="Author's name" 
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="authorPosition">Author Position</Label>
                  <Input 
                    id="authorPosition" 
                    placeholder="Author's position or title" 
                    value={authorPosition}
                    onChange={(e) => setAuthorPosition(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="authorAvatar">Author Avatar URL</Label>
                  <Input 
                    id="authorAvatar" 
                    placeholder="URL to the author's avatar" 
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                isCreating ? setIsCreating(false) : setIsEditing(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                console.log('Submit button clicked');
                if (isCreating) {
                  handleCreateArticle();
                } else {
                  handleUpdateArticle();
                }
              }}
              disabled={!title || !content || !category}
              type="button"
            >
              {isCreating ? 'Create Article' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Article Dialog */}
      <Dialog open={isViewing} onOpenChange={(open) => !open && setIsViewing(false)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentArticle?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {currentArticle?.published_at 
                    ? formatDate(currentArticle.published_at) 
                    : 'Not published'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-1" />
                  {currentArticle?.category}
                </div>
                <Badge variant={currentArticle?.status === 'published' ? 'default' : 'secondary'}>
                  {currentArticle?.status}
                </Badge>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            {currentArticle?.image && (
              <div className="mb-4">
                <img 
                  src={currentArticle.image} 
                  alt={currentArticle.title} 
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Excerpt</h3>
                <p className="text-gray-700">{currentArticle?.excerpt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Content</h3>
                <div 
                  className="text-gray-700 prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: currentArticle?.content || '' }}
                />
              </div>
              
              {currentArticle?.author_name && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Author</h3>
                  <div className="flex items-center mt-2">
                    {currentArticle.author_avatar && (
                      <img 
                        src={currentArticle.author_avatar} 
                        alt={currentArticle.author_name} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <div className="font-medium">{currentArticle.author_name}</div>
                      {currentArticle.author_position && (
                        <div className="text-sm text-gray-500">{currentArticle.author_position}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {currentArticle?.keywords && currentArticle.keywords.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Keywords</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentArticle.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium">SEO & Technical Details</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm font-medium">Slug: </span>
                    <span className="text-gray-700">{currentArticle?.slug}</span>
                  </div>
                  {currentArticle?.meta_description && (
                    <div>
                      <span className="text-sm font-medium">Meta Description: </span>
                      <span className="text-gray-700">{currentArticle.meta_description}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium">Created: </span>
                    <span className="text-gray-700">{formatDate(currentArticle?.created_at || '')}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Last Updated: </span>
                    <span className="text-gray-700">{formatDate(currentArticle?.updated_at || '')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewing(false)}
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewing(false);
                if (currentArticle) {
                  handleEditArticle(currentArticle);
                }
              }}
            >
              Edit Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={(open) => !open && setIsDeleting(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{currentArticle?.title}</p>
            <p className="text-sm text-gray-500 mt-1">{currentArticle?.excerpt}</p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleting(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}