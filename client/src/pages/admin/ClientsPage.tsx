import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Building, FileText, Search } from 'lucide-react';
import { ClientContent } from '../../../shared/schema';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// API functions
import * as clientsApi from '@/api/clients';

interface ClientFormData {
  name: string;
  type: 'client' | 'partner';
  description: string;
  url: string;
  logo: File | null;
  order_index: number;
  clearImage?: boolean;
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientContent | null>(null);
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    type: 'client',
    description: '',
    url: '',
    logo: null,
    order_index: 0,
    clearImage: false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch clients
  const { data: clientsData, isLoading, error } = useQuery<{ success: boolean; data: ClientContent[] }>({
    queryKey: ['content', 'clients'],
    queryFn: async () => {
      const response = await clientsApi.getClients();
      return response;
    }
  });

  const clients = clientsData?.data || [];

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate clients and partners
  const clientsOnly = filteredClients.filter(client => client.type === 'client');
  const partnersOnly = filteredClients.filter(client => client.type === 'partner');

  // Create mutation
  const createMutation = useMutation({
    mutationFn: clientsApi.createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'clients'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Client created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to create client: ${error.message}`,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      clientsApi.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'clients'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Client updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update client: ${error.message}`,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: clientsApi.deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'clients'] });
      toast({
        title: 'Success',
        description: 'Client deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to delete client: ${error.message}`,
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'client',
      description: '',
      url: '',
      logo: null,
      order_index: 0,
      clearImage: false,
    });
    setSelectedClient(null);
    setImagePreview(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (client: ClientContent) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      type: client.type as 'client' | 'partner',
      description: client.description || '',
      url: client.url || '',
      logo: null,
      order_index: client.order_index || 0,
      clearImage: false,
    });
    setImagePreview(client.logo || null);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file, clearImage: false }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, logo: null, clearImage: true }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('url', formData.url);
      formDataToSend.append('order_index', formData.order_index.toString());

      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      // Send flag to clear image if user clicked clear button
      if (formData.clearImage) {
        formDataToSend.append('clearImage', 'true');
      }

      if (selectedClient) {
        updateMutation.mutate({ id: selectedClient.id, data: formDataToSend });
      } else {
        createMutation.mutate(formDataToSend);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit form',
      });
    }
  };

  const handleDelete = (client: ClientContent) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      deleteMutation.mutate(client.id);
    }
  };

  const renderClientTable = (clientList: ClientContent[], type: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          {type === 'client' ? 'Our Clients' : 'Business Associates'}
        </CardTitle>
        <CardDescription>
          Manage {type === 'client' ? 'client organizations' : 'business associate partnerships'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : clientList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {type === 'client' ? 'clients' : 'business associates'} found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientList.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-10 h-10 object-contain rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <Building className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <Badge variant={client.type === 'client' ? 'default' : 'secondary'}>
                      {client.type === 'client' ? 'Client' : 'Partner'}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.order_index || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(client)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(client)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients & Partners Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 max-w-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clients">Clients ({clientsOnly.length})</TabsTrigger>
          <TabsTrigger value="partners">Business Associates ({partnersOnly.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          {renderClientTable(clientsOnly, 'client')}
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          {renderClientTable(partnersOnly, 'partner')}
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? 'Edit Client' : 'Add New Client'}
            </DialogTitle>
            <DialogDescription>
              {selectedClient ? 'Update client information' : 'Add a new client or business associate'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Client/Partner name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'client' | 'partner') =>
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="partner">Business Associate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the client/partner"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">Display Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  order_index: parseInt(e.target.value) || 0
                }))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imagePreview && (
                <div className="mt-2 flex items-start gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-contain border rounded"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearImage}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear Image
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}