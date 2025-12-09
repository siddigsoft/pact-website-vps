import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icons
import { Mail, FileText, Briefcase, Award } from 'lucide-react';

// Define a basic type for contact messages (assuming structure based on usage)
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
}

// Define a basic type for the query response (assuming a data property containing an array)
interface QueryResponse<T> {
  data: T[];
}

export default function DashboardPage() {
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch data for various sections
  const { data: contactMessagesData } = useQuery<QueryResponse<ContactMessage>>({
    queryKey: ['/api/admin/contact'],
    queryFn: getQueryFn({ 
      on401: 'returnNull'
    }),
    refetchOnWindowFocus: false,
  });

  // Placeholder queries for new sections
  const { data: impactStatsData } = useQuery<QueryResponse<any>>({
    queryKey: ['/api/admin/impact'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchOnWindowFocus: false,
  });

  const { data: teamMembersData } = useQuery<QueryResponse<any>>({
    queryKey: ['/api/admin/team'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchOnWindowFocus: false,
  });

  const { data: projectsData } = useQuery<QueryResponse<any>>({
    queryKey: ['/api/admin/projects'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchOnWindowFocus: false,
  });

  const { data: blogArticlesData } = useQuery<QueryResponse<any>>({
    queryKey: ['/api/admin/blog'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    if (contactMessagesData?.data) {
      const unread = contactMessagesData.data.filter((msg) => !msg.is_read).length;
      setUnreadCount(unread);
    }
  }, [contactMessagesData]);

  // Dashboard stats cards
  const statCards = [
    {
      title: 'Contact Messages',
      value: contactMessagesData?.data?.length || 0,
      description: unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read',
      icon: <Mail className="h-5 w-5 text-blue-600" />,
    },
    {
      title: 'Website Sections',
      value: '7',
      description: 'Homepage, Services, Expertise, etc.',
      icon: <FileText className="h-5 w-5 text-green-600" />,
    },
    {
      title: 'Services',
      value: '6',
      description: 'Consulting, Training, etc.',
      icon: <Briefcase className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: 'Expertise Areas',
      value: '6',
      description: 'Financial Sector, Governance, etc.',
      icon: <Award className="h-5 w-5 text-amber-600" />,
    },
    // New placeholder cards
    {
      title: 'Impact Statistics',
      value: impactStatsData?.data?.length || 0,
      description: 'Total impact stats entries',
      icon: <Award className="h-5 w-5 text-yellow-600" />,
    },
    {
      title: 'Team Members',
      value: teamMembersData?.data?.length || 0,
      description: 'Total team members',
      icon: <Award className="h-5 w-5 text-red-600" />,
    },
    {
      title: 'Projects',
      value: projectsData?.data?.length || 0,
      description: 'Total projects',
      icon: <Award className="h-5 w-5 text-purple-600" />,
    },
    {
      title: 'Blog Articles',
      value: blogArticlesData?.data?.length || 0,
      description: 'Total blog articles',
      icon: <Award className="h-5 w-5 text-teal-600" />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-gray-50 border w-full sm:w-auto">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
          <TabsTrigger value="website-stats" className="flex-1 sm:flex-none">Website Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className="bg-gray-50 rounded p-1.5 sm:p-2">
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Welcome to PACT CMS</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                This dashboard provides an overview of your website content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Use the navigation menu to update various sections of your website, including pages, expertise areas, services, clients, projects, and more.
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                This dashboard is designed to help you manage the content displayed on your website in a user-friendly way.
              </p>
            </CardContent>
          </Card>

          {/* Recent Contact Messages Section */}
          {contactMessagesData?.data && contactMessagesData.data.length > 0 && (
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Contact Messages</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Latest messages received through the contact form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {contactMessagesData.data.slice(0, 5).map((message) => (
                    <div key={message.id} className="border-b pb-3 sm:pb-4 last:border-b-0 last:pb-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-800">From: {message.name} ({message.email})</p>
                      <p className="text-xs text-gray-600 mt-1">Subject: {message.subject}</p>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{message.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="website-stats" className="space-y-4 sm:space-y-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Website Statistics</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Overview of your website's content and performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                    {contactMessagesData?.data?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Total Contact Messages</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                    {teamMembersData?.data?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                    {projectsData?.data?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
                    {blogArticlesData?.data?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Blog Articles</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
                    {impactStatsData?.data?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Impact Statistics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}