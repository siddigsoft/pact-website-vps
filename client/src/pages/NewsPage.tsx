import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { NewsCategory } from '@/types';
import CTA from '@/components/home/CTA';
import * as articlesApi from '@/api/articles';
import { BlogArticle as SchemaArticle } from '../../../shared/schema';

// Define the article interface to match the actual response type
interface BlogArticle {
  id: number;
  title: string;
  excerpt?: string | null;
  content: string;
  category: string;
  image?: string | null;
  status: string;
  slug: string;
  meta_description?: string | null;
  keywords?: string[] | null;
  author_name?: string | null;
  author_position?: string | null;
  author_avatar?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  published_at?: Date | string | null;
  updated_by?: number | null;
}

const NewsPage = () => {
  const [location, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');
  
  // Fetch blog articles from API
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ['articles', 'published'],
    queryFn: async () => {
      const response = await articlesApi.getArticles(true);
      return response;
    },
    refetchOnWindowFocus: false,
  });
  
  // Get articles from API or use empty array if not loaded
  const articles: BlogArticle[] = articlesData?.data || [];
  
  // Define all categories
  const categories: NewsCategory[] = [
    'All',
    'Industry Insights',
    'Case Studies',
    'Company News',
    'Careers'
  ];
  
  // Filter articles by selected category
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(item => item.category === activeCategory);
  
  // Format publication date
  const formatPublicationDate = (dateString: Date | string | null | undefined) => {
    if (!dateString) return 'Date not available';
    
    try {
      if (typeof dateString === 'string') {
        return format(parseISO(dateString), 'MMMM d, yyyy');
      }
      // If it's already a Date object
      return format(dateString, 'MMMM d, yyyy');
    } catch (error) {
      return 'Date not available';
    }
  };
  
  // Navigate to article detail
  const navigateToArticle = (slug: string) => {
    setLocation(`/news/${slug}`);
  };

  // Initialize AOS when component mounts
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="bg-primary text-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">News & Insights</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              Stay informed with our latest thinking, research, industry insights, and company updates.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  className={cn(
                    "py-1.5 sm:py-2 px-3 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all",
                    activeCategory === category 
                      ? "bg-white text-primary" 
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* News Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
              <p className="mt-3 sm:mt-4 text-secondary text-sm sm:text-base">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-secondary text-sm sm:text-base">No articles found in this category.</p>
              {activeCategory !== 'All' && (
                <button
                  className="mt-3 sm:mt-4 text-primary hover:text-primary/80 font-medium text-sm sm:text-base"
                  onClick={() => setActiveCategory('All')}
                >
                  View all articles
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {filteredArticles.map(item => (
                <div 
                  key={item.id} 
                  className="news-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
                  data-aos="fade-up"
                  onClick={() => navigateToArticle(item.slug)}
                >
                  <img 
                    src={item.image || 'https://placehold.co/800x450?text=PACT+Consultancy'} 
                    alt={item.title} 
                    className="w-full h-48 sm:h-56 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x450?text=PACT+Consultancy';
                    }}
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        item.category === 'Industry Insights' && "bg-blue-100 text-blue-700",
                        item.category === 'Case Studies' && "bg-green-100 text-green-700",
                        item.category === 'Company News' && "bg-orange-100 text-orange-700",
                        item.category === 'Careers' && "bg-purple-100 text-purple-700"
                      )}>
                        {item.category}
                      </span>
                      <span className="text-xs text-secondary">{formatPublicationDate(item.published_at)}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-secondary mb-4 sm:mb-5 text-sm sm:text-base">
                      {item.excerpt}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToArticle(item.slug);
                      }}
                      className="text-primary font-medium hover:text-accent transition-colors flex items-center text-sm sm:text-base"
                    >
                      <span>Read More</span>
                      <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Featured Article */}
          {articles.length > 0 && (
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden mb-12 sm:mb-16" data-aos="fade-up">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img 
                    src={articles[0].image || 'https://placehold.co/800x450?text=PACT+Consultancy'} 
                    alt={articles[0].title} 
                    className="w-full h-48 sm:h-64 md:h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x450?text=PACT+Consultancy';
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      articles[0].category === 'Industry Insights' && "bg-blue-100 text-blue-700",
                      articles[0].category === 'Case Studies' && "bg-green-100 text-green-700",
                      articles[0].category === 'Company News' && "bg-orange-100 text-orange-700",
                      articles[0].category === 'Careers' && "bg-purple-100 text-purple-700"
                    )}>
                      {articles[0].category}
                    </span>
                    <span className="text-xs text-secondary">{formatPublicationDate(articles[0].published_at)}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3 sm:mb-4">{articles[0].title}</h2>
                  <p className="text-secondary mb-4 sm:mb-6 text-sm sm:text-base">
                    {articles[0].excerpt}
                  </p>
                  <button
                    onClick={() => navigateToArticle(articles[0].slug)}
                    className="text-primary font-medium hover:text-accent transition-colors flex items-center text-sm sm:text-base"
                  >
                    <span>Read Full Article</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <CTA />
    </div>
  );
};

export default NewsPage;
