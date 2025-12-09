import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface ContentBlock {
  id: string;
  type: string;
  content: string;
  settings?: {
    altText?: string;
    [key: string]: any;
  };
}

interface StatItem {
  id?: number;
  value: number;
  suffix?: string;
  label: string;
  icon?: string;
  color?: string;
  order_index?: number;
}

const Statistics = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Fetch stats directly from the API
  useEffect(() => {
    const fetchStats = async () => {
      console.log('Fetching impact stats...');
      try {
        const response = await fetch('/api/impact-stats', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          cache: 'no-cache'
        });
        console.log('API response status:', response.status);
        const data = await response.json();
        console.log('Raw API response:', data);
        
        if (data.success && Array.isArray(data.data)) {
          // Sort by order_index to ensure consistent display
          const sortedStats = [...data.data].sort((a, b) => a.order_index - b.order_index);
          // Parse values as numbers to ensure they work with CountUp
          const processedStats = sortedStats.map(stat => {
            const parsedValue = parseInt(stat.value.toString(), 10);
            console.log(`Processing stat: ${stat.label}, value: ${stat.value} (${typeof stat.value}) -> parsed: ${parsedValue} (${typeof parsedValue})`);
            return {
              ...stat,
              value: parsedValue
            };
          });
          console.log('Processed impact stats:', processedStats);
          setStats(processedStats);
        } else {
          console.error('Failed to fetch impact stats or invalid data format', data);
          // Fall back to default stats if API fails
          console.log('Using default stats due to API error');
          setStats(defaultStats);
        }
      } catch (error) {
        console.error('Error fetching impact stats:', error);
        console.log('Using default stats due to error');
        setStats(defaultStats);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Fetch immediately on component mount
    fetchStats();
    
    // Set up a refresh interval (every 30 seconds)
    const refreshInterval = setInterval(fetchStats, 30000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Detect when the stats section enters the viewport to trigger animations

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // PACT Consultancy default stats if we don't have data
  const defaultStats: StatItem[] = [
    {
      value: 17,
      suffix: '+',
      label: 'YEARS OF EXPERIENCE IN DEVELOPMENT CONSULTING & TECHNICAL ASSISTANCE.',
      color: '#E96D1F'
    },
    {
      value: 40,
      suffix: '+',
      label: 'MACRO-ECONOMIC & SOCIAL STUDIES WITH IMPACT ON NATIONAL POLICY & DEVELOPMENT',
      color: '#1A3A5F'
    },
    {
      value: 50,
      suffix: '+',
      label: 'MEDIUM & HIGH-VALUE PROJECTS WITH REPUTABLE INTERNATIONAL ORGANIZATIONS.',
      color: '#E96D1F'
    },
    {
      value: 10,
      suffix: '+',
      label: 'THEMATIC AREAS OF CONSULTING & SDG-ALIGNED TECHNICAL ASSISTANCE.',
      color: '#1A3A5F'
    },
    {
      value: 20,
      suffix: '+',
      label: 'STRATEGIC GLOBAL PARTNERSHIPS ON PROJECTS.',
      color: '#E96D1F'
    }
  ];

  // Render loading skeleton
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-md bg-white shadow-sm">
                <Skeleton className="h-16 w-16 mx-auto mb-4" />
                <Skeleton className="h-10 w-24 mx-auto mb-2" />
                <Skeleton className="h-5 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Render the statistics
  return (
    <section ref={sectionRef} className="py-12 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3A5F] uppercase tracking-wide mb-4">
            OUR GLOBAL IMPACT
          </h2>
          <div className="h-1 w-24 bg-[#E96D1F] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            For over 17 years, we have been helping organizations succeed through development consultation and technical assistance.
          </p>
        </div>
        {/* One card per row on mobile, 3 per row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => {
            const isThematic = index % 2 === 0;
            return (
              <div
                key={stat.id || index}
                className="h-[180px] flex flex-col justify-center"
                style={{ 
                  backgroundColor: isThematic ? 
                    stat.color || '#E96D1F' : 
                    (index === 1 ? '#1A3A5F' : '#E96D1F') 
                }}
              >
                <div className="text-center px-6">
                  <div className="counter-value text-5xl md:text-6xl font-bold mb-4 text-white">
                    <CountUp 
                      start={0}
                      end={stat.value} 
                      duration={2.5} 
                      suffix={stat.suffix || ''} 
                      redraw={hasAnimated}
                      preserveValue={true}
                      useEasing={true}
                    />
                  </div>
                  <div className="counter-label text-xs md:text-sm font-medium uppercase text-white px-4">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;