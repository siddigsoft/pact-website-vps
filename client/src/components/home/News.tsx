import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { NewsCategory, NewsItem } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import * as articlesApi from '@/api/articles';

const News = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');
  
  const categories: NewsCategory[] = [
    'All', 
    'Industry Insights', 
    'Case Studies', 
    'Company News',
    'Careers'
  ];

  // Use React Query to fetch articles
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ['articles', 'published', 'home'],
    queryFn: async () => {
      const response = await articlesApi.getArticles(true);
      // Only take the first 3 articles for the home page
      return {
        ...response,
        data: response.data.slice(0, 3)
      };
    },
    refetchOnWindowFocus: false,
  });

  const articles = articlesData?.data || [];
  
  // If there are no articles, don't render the section
  if (!isLoading && articles.length === 0) {
    return null;
  }
  
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(item => item.category === activeCategory);

  return (
    <section id="news" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">News & Insights</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Stay updated with our latest thinking, research, and events.
          </p>
        </div>
        
        {/* News Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "py-2 px-5 rounded-full text-sm font-medium transition-all hover:shadow-md",
                activeCategory === category 
                  ? "news-filter active bg-primary text-white" 
                  : "news-filter bg-gray-100 text-secondary hover:bg-gray-200"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          // Loading Skeleton
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="news-item bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-7 w-full mb-2" />
                  <Skeleton className="h-7 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-5" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          /* News Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((item) => (
              <div 
                key={item.id} 
                className="news-item bg-white rounded-lg shadow-md overflow-hidden" 
                data-aos="fade-up"
                data-category={item.category}
              >
                <img 
                  src={item.image || 'https://placehold.co/800x450?text=PACT+Consultancy'} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/800x450?text=PACT+Consultancy';
                  }}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      item.category === 'Industry Insights' && "bg-blue-100 text-blue-700",
                      item.category === 'Case Studies' && "bg-green-100 text-green-700",
                      item.category === 'Company News' && "bg-orange-100 text-orange-700",
                      item.category === 'Careers' && "bg-purple-100 text-purple-700"
                    )}>
                      {item.category}
                    </span>
                    <span className="text-xs text-secondary">{new Date(item.published_at || '').toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-3">{item.title}</h3>
                  <p className="text-secondary mb-5">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-primary font-medium hover:text-accent transition-colors flex items-center"
                  >
                    <span>Read More</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No articles found in this category.</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/news" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-md transition-all">
            View All Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
