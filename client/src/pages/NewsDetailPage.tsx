import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import CTA from '@/components/home/CTA';
import * as articlesApi from '@/api/articles';

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

const NewsDetailPage = () => {
  const [, params] = useRoute('/news/:slug');
  const slug = params?.slug || '';

  // Fetch blog article from API
  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ['articles', slug],
    queryFn: async () => {
      if (!slug) return { success: false, data: null };
      return await articlesApi.getArticleBySlug(slug);
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
  });

  const article = articleData?.data;

  // Format publication date
  const formatDate = (dateString: Date | string | null | undefined) => {
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

  // Initialize AOS when component mounts
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
    
    // Update page title and meta description for SEO
    if (article) {
      document.title = `${article.title} | PACT Consultancy`;
      
      // Update meta description if available
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && article.meta_description) {
        metaDescription.setAttribute('content', article.meta_description);
      }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [article]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-secondary">Loading article...</p>
        </div>
      </div>
    );
  }

  // If error or no article found, show error state
  if (error || !article) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-center mb-4">Article Not Found</h1>
          <p className="text-secondary mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/news">
            <a className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Back to News
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      {/* Article Header */}
      <header className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4" data-aos="fade-up">
            <Link href="/news">
              <a className="text-primary hover:text-primary/80 font-medium text-sm">
                News & Insights
              </a>
            </Link>
            <span className="text-secondary">/</span>
            <span 
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                article.category === 'Industry Insights' && "bg-blue-100 text-blue-700",
                article.category === 'Case Studies' && "bg-green-100 text-green-700",
                article.category === 'Company News' && "bg-orange-100 text-orange-700",
                article.category === 'Careers' && "bg-purple-100 text-purple-700"
              )}
            >
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center">
              {article.author_name && article.author_avatar && (
                <>
                  <img 
                    src={article.author_avatar} 
                    alt={article.author_name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div>
                    <div className="font-medium text-dark">{article.author_name}</div>
                    {article.author_position && (
                      <div className="text-sm text-secondary">{article.author_position}</div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="text-sm text-secondary">
              {formatDate(article.published_at)}
            </div>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      {article.image && (
        <div className="container mx-auto px-4 md:px-8 mb-12" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-[400px] object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/1200x400?text=PACT+Consultancy";
              }}
            />
          </div>
        </div>
      )}
      
      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Excerpt */}
          <div className="text-xl text-secondary mb-8 font-serif italic border-l-4 border-primary/20 pl-6 py-2" data-aos="fade-up">
            {article.excerpt}
          </div>
          
          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none" 
            dangerouslySetInnerHTML={{ __html: article.content }}
            data-aos="fade-up"
            data-aos-delay="100"
          />
          
          {/* Tags/Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200" data-aos="fade-up">
              <h3 className="text-sm font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-secondary"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Share Options */}
          <div className="mt-12 flex items-center justify-between" data-aos="fade-up">
            <div>
              <h3 className="text-sm font-medium mb-2">Share this article</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <i className="fab fa-linkedin text-gray-600"></i>
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <i className="fab fa-twitter text-gray-600"></i>
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <i className="far fa-envelope text-gray-600"></i>
                </button>
              </div>
            </div>
            <Link href="/news">
              <a className="text-primary hover:text-primary/80 font-medium">
                Back to all articles
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Related Articles placeholder - could be implemented in future */}
      
      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default NewsDetailPage;