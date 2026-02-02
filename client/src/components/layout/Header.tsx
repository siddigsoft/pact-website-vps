import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import pactLogo from '@/assets/pact-logo.png';
import { Menu, X, Search } from 'lucide-react';

import { getServices } from '@/api/services';
import { getProjects } from '@/api/projects';
import { getArticles } from '@/api/articles';
import { getTeamMembers } from '@/api/team';
import { getClients } from '@/api/clients';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [allContent, setAllContent] = useState<any[] | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const searchDebounceRef = useRef<number | null>(null);

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

  // Load all content when search first opens
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!searchOpen || allContent) return;
      setIsLoadingResults(true);
      try {
        const [servicesRes, projectsRes, articlesRes, teamRes, clientsRes] = await Promise.allSettled([
          getServices(),
          getProjects(),
          getArticles(true),
          getTeamMembers(),
          getClients(),
        ]);
        const combined: any[] = [];

        const extractArray = (res: any) => {
          if (!res || res.status !== 'fulfilled') return [];
          const v = res.value;
          if (Array.isArray(v)) return v;
          if (Array.isArray(v?.data)) return v.data;
          if (Array.isArray(v?.data?.data)) return v.data.data;
          return [];
        };

        const services = extractArray(servicesRes);
        const projects = extractArray(projectsRes);
        const articles = extractArray(articlesRes);
        const team = extractArray(teamRes);
        const clients = extractArray(clientsRes);

        services.forEach((s: any) => combined.push({ type: 'Service', title: s.title, excerpt: s.description, id: s.id, url: `/service/${s.id}` }));
        projects.forEach((p: any) => combined.push({ type: 'Project', title: p.title, excerpt: p.description, id: p.id, url: `/projects/${p.id}` }));
        articles.forEach((a: any) => combined.push({ type: 'Article', title: a.title, excerpt: a.excerpt || a.content?.slice(0, 150), id: a.id, url: `/news/${a.slug}` }));
        team.forEach((m: any) => combined.push({ type: 'Team', title: m.name, excerpt: m.position, id: m.id, url: `/team/${m.slug}` }));
        clients.forEach((c: any) => combined.push({ type: 'Client', title: c.name, excerpt: c.description, id: c.id, url: `/clients` }));

        if (mounted) setAllContent(combined);
      } catch (err) {
        // ignore - results will remain empty
        console.error('Search load error', err);
      } finally {
        if (mounted) setIsLoadingResults(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, [searchOpen, allContent]);

  // Debounced filtering of the loaded content
  useEffect(() => {
    if (!allContent) return;
    if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = window.setTimeout(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) {
        setResults([]);
        return;
      }

      const filtered = allContent.filter((item: any) => {
        const hay = `${item.title ?? ''} ${item.excerpt ?? ''} ${item.type ?? ''}`.toLowerCase();
        return hay.includes(q);
      });

      setResults(filtered.slice(0, 20));
    }, 220);

    return () => { if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current); };
  }, [searchQuery, allContent]);

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
        "absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden z-50 border-b border-gray-200", 
        searchOpen ? "max-h-96" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-b-2 border-gray-200 focus:border-accent py-2 pl-10 pr-4 text-lg outline-none text-gray-900" 
              placeholder="Search the site (services, projects, news, team, clients)..." 
              aria-label="Global site search"
            />
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <button 
              onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-accent"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-4 max-h-72 overflow-auto">
            {isLoadingResults && (
              <div className="text-gray-600">Loading search index...</div>
            )}

            {!isLoadingResults && !allContent && (
              <div className="text-gray-600">Open search to load site content.</div>
            )}

            {!isLoadingResults && allContent && searchQuery.trim().length === 0 && (
              <div className="text-gray-600">Type to search across services, projects, news, team and clients.</div>
            )}

            {!isLoadingResults && results.length === 0 && allContent && searchQuery.trim().length > 0 && (
              <div className="text-gray-600">No results found for "{searchQuery}".</div>
            )}

            <ul className="divide-y divide-gray-100">
              {results.map((r, idx) => (
                <li key={`${r.type}-${r.id}-${idx}`}>
                  <a
                    href={r.url}
                    onClick={(e) => { e.preventDefault(); navigateTo(r.url)(e as any); }}
                    className="block p-3 hover:bg-gray-50 text-gray-900"
                  >
                    <div className="text-sm text-gray-500">{r.type}</div>
                    <div className="font-medium text-gray-900">{r.title}</div>
                    {r.excerpt && <div className="text-sm text-gray-700 mt-1">{r.excerpt}</div>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden bg-primary/95 overflow-hidden transition-all duration-300 shadow-lg",
        mobileMenuOpen ? "max-h-screen" : "max-h-0"
      )}>
        <nav className="container mx-auto px-4 md:px-8 py-4 flex flex-col divide-y divide-white/10">
          <a href="/" onClick={navigateTo("/")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Home
          </a>
          <a href="/services" onClick={navigateTo("/services")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Services
          </a>
          <a href="/projects" onClick={navigateTo("/projects")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Projects
          </a>
          <a href="/team" onClick={navigateTo("/team")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Team
          </a>
          <a href="/clients" onClick={navigateTo("/clients")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Clients
          </a>
          <a href="/news" onClick={navigateTo("/news")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            News
          </a>
          <a href="/contact" onClick={navigateTo("/contact")} className="font-medium text-white py-3 hover:text-accent active:bg-white/10 px-2 rounded text-base min-h-[44px] flex items-center">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
