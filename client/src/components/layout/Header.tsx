import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import pactLogo from '@/assets/pact-logo.png';
import { Menu, X, Search } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Close mobile menu when changing location
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location === path;
  };

  const navigateTo = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "py-0 bg-primary shadow-md" : "py-1 bg-primary"
      )}
    >
      {/* Main navigation */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          <a href="/" onClick={navigateTo("/")} className="flex items-center group">
            <img src={pactLogo} alt="PACT Consultancy Logo" className="h-12 lg:h-14" />
            <span className="ml-3 text-white font-semibold text-lg hidden sm:block">
              PACT <br />
              Consultancy
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <a href="/" onClick={navigateTo("/")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/') && "text-accent after:w-full"
            )}>
              Our Company
            </a>
            <a href="/services" onClick={navigateTo("/services")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/services') && "text-accent after:w-full"
            )}>
              Services
            </a>
            <a href="/projects" onClick={navigateTo("/projects")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/projects') && "text-accent after:w-full"
            )}>
              Projects
            </a>
            <a href="/team" onClick={navigateTo("/team")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/team') && "text-accent after:w-full"
            )}>
              Team
            </a>
            <a href="/clients" onClick={navigateTo("/clients")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/clients') && "text-accent after:w-full"
            )}>
              Clients
            </a>
            <a href="/news" onClick={navigateTo("/news")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/news') && "text-accent after:w-full"
            )}>
              News
            </a>
            <a href="/contact" onClick={navigateTo("/contact")} className={cn(
              "px-3 py-2 font-medium text-white hover:text-accent relative uppercase text-sm tracking-wide after:bg-accent",
              isActive('/contact') && "text-accent after:w-full"
            )}>
              Contact
            </a>
            
            {/* Mobile-visible utility buttons */}
            <div className="lg:hidden flex items-center ml-4">
              <button 
                onClick={toggleSearch}
                className="p-2 text-primary hover:text-accent"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </nav>
          
          {/* Mobile utility buttons */}
          <div className="flex items-center space-x-1 lg:hidden">
            <button 
              onClick={toggleSearch}
              className="p-2 text-white hover:text-accent"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-white hover:text-accent focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search overlay */}
      <div className={cn(
        "absolute w-full bg-primary/95 shadow-lg transition-all duration-300 overflow-hidden z-50", 
        searchOpen ? "max-h-40" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-transparent border-b-2 border-white/30 focus:border-accent py-2 pl-10 pr-4 text-lg outline-none text-white" 
              placeholder="Search..." 
            />
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
            <button 
              onClick={toggleSearch}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-accent"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden bg-primary/95 overflow-hidden transition-all duration-300 shadow-lg",
        mobileMenuOpen ? "max-h-screen" : "max-h-0"
      )}>
        <nav className="container mx-auto px-4 md:px-8 py-4 flex flex-col divide-y divide-white/10">
          <a href="/" onClick={navigateTo("/")} className="font-medium text-white py-3 hover:text-accent">
            Home
          </a>
          <a href="/services" onClick={navigateTo("/services")} className="font-medium text-white py-3 hover:text-accent">
            Services
          </a>
          <a href="/projects" onClick={navigateTo("/projects")} className="font-medium text-white py-3 hover:text-accent">
            Projects
          </a>
          <a href="/team" onClick={navigateTo("/team")} className="font-medium text-white py-3 hover:text-accent">
            Team
          </a>
          <a href="/clients" onClick={navigateTo("/clients")} className="font-medium text-white py-3 hover:text-accent">
            Clients
          </a>
          <a href="/news" onClick={navigateTo("/news")} className="font-medium text-white py-3 hover:text-accent">
            News
          </a>
          <a href="/contact" onClick={navigateTo("/contact")} className="font-medium text-white py-3 hover:text-accent">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
