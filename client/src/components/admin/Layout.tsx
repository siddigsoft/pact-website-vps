import { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useRoute, Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

// Import admin pages
import DashboardPage from '@/pages/admin/DashboardPage';
import ExpertisePage from '@/pages/admin/ExpertisePage';
import ServicesPage from '@/pages/admin/ServicesPage';
import ClientsPage from '@/pages/admin/ClientsPage';
import ProjectsPage from '@/pages/admin/ProjectsPage';
import ContactMessagesPage from '@/pages/admin/ContactMessagesPage';
import ImpactStatsPage from '@/pages/admin/ImpactStatsPage';

// UI Components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Icons
import {
  LayoutDashboard,
  Award,
  Briefcase,
  Users,
  FolderArchive,
  Mail,
  Menu,
  User,
  LogOut,
  ChevronRight,
  BarChart4
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon, title, isActive, onClick }: NavItemProps) {
  return (
    <Link href={href}>
      <a
        className={`flex items-center py-2 px-4 rounded-md ${
          isActive
            ? 'bg-primary text-white'
            : 'text-secondary hover:bg-primary/10'
        }`}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span>{title}</span>
      </a>
    </Link>
  );
}

export default function AdminLayout() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Check if user is authenticated
  useEffect(() => {
    const jwt = localStorage.getItem('cms-jwt');
    if (!jwt) {
      setLocation('/admin');
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please log in to access the admin dashboard.',
      });
    }
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('cms-jwt');
    localStorage.removeItem('cms-user');
    setLocation('/admin');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of the admin dashboard.',
    });
  };

  const navItems = [
    {
      href: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
      title: 'Dashboard',
    },
    {
      href: '/admin/content/expertise',
      icon: <Award size={20} />,
      title: 'Expertise Areas',
    },
    {
      href: '/admin/content/services',
      icon: <Briefcase size={20} />,
      title: 'Services',
    },
    {
      href: '/admin/content/clients',
      icon: <Users size={20} />,
      title: 'Clients & Partners',
    },
    {
      href: '/admin/content/projects',
      icon: <FolderArchive size={20} />,
      title: 'Projects',
    },
    {
      href: '/admin/content/impact',
      icon: <BarChart4 size={20} />,
      title: 'Impact Stats',
    },
    {
      href: '/admin/messages',
      icon: <Mail size={20} />,
      title: 'Contact Messages',
    },
  ];

  // Get current user data
  const userDataString = localStorage.getItem('cms-user');
  const userData = userDataString ? JSON.parse(userDataString) : { username: 'Admin' };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </Button>
            <Link href="/admin/dashboard">
              <a className="flex items-center">
                <img src="/pact-logo.png" alt="PACT CMS" className="h-8 w-auto" />
                <span className="ml-2 font-semibold text-xl">CMS</span>
              </a>
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User size={20} className="text-primary" />
                <span>{userData.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside
          className={`md:block w-64 bg-white border-r transition-all duration-300 ${
            isMobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'
          } md:static md:z-0`}
        >
          <div className="p-4">
            <div className="mb-6 pb-4 border-b md:hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={location === item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Switch>
            <Route path="/admin/dashboard" component={DashboardPage} />
            <Route path="/admin/content/expertise" component={ExpertisePage} />
            <Route path="/admin/content/services" component={ServicesPage} />
            <Route path="/admin/content/clients" component={ClientsPage} />
            <Route path="/admin/content/projects" component={ProjectsPage} />
            <Route path="/admin/content/impact" component={ImpactStatsPage} />
            <Route path="/admin/messages" component={ContactMessagesPage} />
            <Route>
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-gray-800">Page not found</h2>
                <p className="text-gray-600 mt-2">The admin page you are looking for doesn't exist.</p>
                <Link href="/admin/dashboard">
                  <a className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md">
                    Go to Dashboard
                  </a>
                </Link>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}