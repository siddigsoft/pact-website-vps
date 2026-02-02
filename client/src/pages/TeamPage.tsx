import { useState, useEffect } from 'react';
import { Search, MapPin, Mail, Linkedin, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import * as teamApi from '@/api/team';
import React from 'react';

// Utility to strip HTML tags and normalize whitespace for short excerpts
const stripHtml = (html?: string) => {
  if (!html) return '';
  try {
    // Remove tags
    const withoutTags = html.replace(/<[^>]*>/g, ' ');
    // Collapse whitespace/newlines
    return withoutTags.replace(/\s+/g, ' ').trim();
  } catch (e) {
    return html;
  }
};

// Define the TeamMember interface to match the API response
interface TeamMember {
  id: number;
  name: string;
  position?: string;
  department?: string;
  location?: string;
  bio?: string;
  expertise: string[];
  image?: string | null;
  slug?: string;
  metaDescription?: string | null;
  email?: string;
  linkedin?: string;
  services?: any[];
  contact?: {
    email?: string;
    linkedin?: string;
  };
  // derived category (Board, Advisory Board, Management, Associate Consultant, etc.)
  category?: string;
}

// Define Service interface
interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  details: string[];
  image: string;
  order_index: number;
}

// Team filters
type TeamFilter = 'All' | 'Advisory Board' | string;

// Team member card component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      style={{
        border: '1px solid #d1d5db', 
        borderRadius: 0, 
        background: isHovered ? '#f8fafc' : '#ffffff', 
        boxShadow: 'none',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'stretch', 
        padding: '24px 20px', 
        margin: 8, 
        minHeight: 120,
        width: '100%',
        maxWidth: 340,
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        borderLeft: isHovered ? '3px solid #1a3a5f' : '1px solid #d1d5db',
        cursor: 'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
  {/* Name, Position and short bio */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ 
          fontWeight: 600, 
          fontSize: 18, 
          color: isHovered ? '#0f2847' : '#1a3a5f', 
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease-in-out'
        }}>
          {member.name}
        </div>
        {member.position && (
          <div style={{ 
            color: isHovered ? '#475569' : '#64748b', 
            fontWeight: 400, 
            fontSize: 14,
            lineHeight: 1.5,
            transition: 'color 0.2s ease-in-out'
          }}>
            {member.position}
          </div>
        )}
        {/* Short bio excerpt (strip HTML so artifacts like <p><br></p> don't show) */}
        {(() => {
          const plain = stripHtml(member.bio);
          if (!plain) return null;
          const excerpt = plain.length > 140 ? `${plain.slice(0, 137)}...` : plain;
          return (
            <div style={{ color: '#475569', fontSize: 13, lineHeight: 1.4, marginTop: 6 }}>
              {excerpt}
            </div>
          );
        })()}
        {/* Contact icons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {member.contact?.email || member.email ? (
            <a href={`mailto:${member.contact?.email || member.email}`} style={{ color: '#1a3a5f', fontSize: 13, textDecoration: 'none' }}>
              <Mail className="w-4 h-4 inline-block mr-1" /> Email
            </a>
          ) : null}
          {member.contact?.linkedin || member.linkedin ? (
            <a href={member.contact?.linkedin || member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#1a3a5f', fontSize: 13, textDecoration: 'none' }}>
              <Linkedin className="w-4 h-4 inline-block mr-1" /> LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<TeamFilter>('All');
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [membersWithCategory, setMembersWithCategory] = useState<TeamMember[]>([]);
  
  const categoryDescriptions: Record<string, string> = {
    'Advisory Board': 'Our Advisory Board offers experienced guidance and specialist advice across our practice areas.',
    'Management': 'Senior leaders responsible for operations, delivery, and client relationships.',
    'Associate Consultant': 'Early-career and associate consultants who support project delivery and analysis.'
  };

  // Fetch services data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/content/services');

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          // Sort services by order_index
          const sortedServices = [...data.data].sort((a, b) => a.order_index - b.order_index);
          setServices(sortedServices);
        }
      } catch (err) {
        // Error handling without logging
      }
    };

    fetchServices();
  }, []);

  // Fetch team members from API using React Query
  const { data: teamMembersData, isLoading, error } = useQuery<{
    success: boolean;
    data: TeamMember[];
  }>({ // Explicitly type useQuery
    queryKey: ['teamMembers'],
    queryFn: async () => {
      const response = await teamApi.getTeamMembers(); // Use the new API function
      // Ensure expertise is always an array and handle missing fields gracefully
      const transformedData = response.data.map((member: any) => ({
        id: member.id,
        name: member.name || '',
        position: member.position || '',
        department: member.department || '',
        location: member.location || '',
        bio: member.bio || '',
        expertise: Array.isArray(member.expertise) ? member.expertise :
          (typeof member.expertise === 'string' ? [member.expertise] : []),
        image: member.image || null,
        slug: member.slug || '',
        metaDescription: member.metaDescription || null,
        // Preserve any persisted category from API
        category: member.category || undefined,
        // No flattening of email/linkedin
        contact: {
          email: member.email || undefined,
          linkedin: member.linkedin || undefined,
        },
        services: Array.isArray(member.services) ? member.services : [],
      }));
      return { success: response.success, data: transformedData };
    },
    // Keep data fresh, but avoid unnecessary refetches
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes (previously cacheTime)
    refetchOnWindowFocus: false,
  });

  // Use the data from useQuery
  const allTeamMembers: TeamMember[] = (teamMembersData as any)?.data || [];

  // Derive categories from team member position/department and attach a category to each member
  useEffect(() => {
    if (!allTeamMembers || allTeamMembers.length === 0) return;

    const detectCategory = (member: TeamMember) => {
      const pos = (member.position || '').toLowerCase();
      const dep = (member.department || '').toLowerCase();

      // Normalize to the limited set: Advisory Board, Management, Associate Consultant
      if (pos.includes('advisor') || pos.includes('advisory') || dep.includes('advisory') || pos.includes('board') || dep.includes('board') || pos.includes('chair')) return 'Advisory Board';
      if (pos.includes('associate') || pos.includes('associate consultant')) return 'Associate Consultant';
      if (pos.includes('manager') || pos.includes('director') || pos.includes('chief') || pos.includes('head') || dep.includes('management')) return 'Management';

      // Fallback: mark as Other so we can show them in an "Other" section inside the All view
      return 'Other';
    };

  // Only apply the heuristic when the API hasn't provided a category
  const membersWithCategory = allTeamMembers.map(m => ({ ...m, category: (m.category && String(m.category).trim()) ? m.category : detectCategory(m) }));

  // compute categories (always expose the preferred set so tabs are stable)
  const preferredOrder = ['Advisory Board', 'Management', 'Associate Consultant'];
  setCategories(preferredOrder);
  setMembersWithCategory(membersWithCategory);

    // if activeFilter is 'All' and there are categories, keep as All; otherwise ensure activeFilter still valid
    // Ensure activeFilter is valid (either All or one of the preferred categories)
    const validFilters = ['All', ...preferredOrder];
    if (!validFilters.includes(activeFilter)) {
      setActiveFilter('All');
    }
    // eslint-disable-next-line
  }, [allTeamMembers]);

  // Filter team members based on search and filter
  useEffect(() => {
    if (allTeamMembers.length === 0 && !isLoading) {
      setFilteredMembers([]);
      return;
    }

  let result = [...membersWithCategory.length ? membersWithCategory : allTeamMembers];

    // Apply category filter
    if (activeFilter !== 'All') {
      result = result.filter(member => (member.category || 'Other') === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        member =>
          member.name.toLowerCase().includes(term) ||
          member.position?.toLowerCase().includes(term) ||
          member.department?.toLowerCase().includes(term) ||
          member.location?.toLowerCase().includes(term) ||
          (typeof member.bio === 'string' && member.bio.toLowerCase().includes(term))
      );
    }

    setFilteredMembers(result);
  }, [searchTerm, activeFilter, allTeamMembers, isLoading, membersWithCategory]); // Add membersWithCategory so filters update when categories are derived

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
      <div className="bg-primary text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Meet Our Team</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              Our talented professionals bring diverse expertise and experience to deliver exceptional results for our clients.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for team members by name, position, or location..."
                className="w-full px-4 sm:px-5 py-3 sm:py-4 pl-10 sm:pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Categories Header Tabs */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center overflow-x-auto whitespace-nowrap gap-2 lg:flex-wrap" data-aos="fade-up">
            <button
              className={`py-2 sm:py-3 px-3 sm:px-4 font-medium text-xs sm:text-base border-b-2 transition-colors whitespace-nowrap ${activeFilter === 'All'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-600 hover:text-primary'
                }`}
              onClick={() => setActiveFilter('All')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`py-2 sm:py-3 px-3 sm:px-4 font-medium text-xs sm:text-base border-b-2 transition-colors whitespace-nowrap ${activeFilter === cat
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary'
                  }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section with Sidebar Layout */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 mb-6 sm:mb-8 lg:mb-0 lg:pr-8">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Our Team</h3>

                <div className="flex flex-col space-y-2">
                  <div className="flex gap-2 overflow-x-auto lg:flex-col">
                    <button
                      className={`py-2 px-2 sm:px-4 text-left font-medium rounded-md transition-colors text-xs sm:text-sm ${activeFilter === 'All'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      onClick={() => setActiveFilter('All')}
                    >
                      All
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`py-2 px-2 sm:px-4 text-left font-medium rounded-md transition-colors text-xs sm:text-sm ${activeFilter === cat
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        onClick={() => setActiveFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Content */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-sm" data-aos="fade-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3 sm:mb-4">Loading Team Members...</h2>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-sm" data-aos="fade-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3 sm:mb-4">Error Loading Team Members</h2>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">{error.message}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-sm" data-aos="fade-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3 sm:mb-4">No Team Members Found</h2>
                  <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
                    {searchTerm ? `No team members found matching "${searchTerm}". Try adjusting your search terms.` : 'No team members available at the moment.'}
                  </p>
                </div>
              ) : (
                <>

                    {activeFilter === 'All' ? (
                      // Show all members in a flat grid with an "Our Team" heading and description
                      <div className="mb-8" data-aos="fade-up">
                        <h3 className="text-2xl font-semibold text-dark mb-2">Our Team</h3>
                        <p className="text-gray-600 mb-4">A range of specialist consultants and subject-matter experts who support our projects and deliver value to our clients.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {filteredMembers.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Show only the selected category with an optional description (e.g., Advisory Board)
                      <div className="mb-8" data-aos="fade-up">
                        <h3 className="text-2xl font-semibold text-dark mb-2">{activeFilter}</h3>
                        {categoryDescriptions[activeFilter] && (
                          <p className="text-gray-600 mb-4">{categoryDescriptions[activeFilter]}</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {filteredMembers.map(member => (
                            <TeamMemberCard key={member.id} member={member} />
                          ))}
                        </div>
                      </div>
                    )}



                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0" data-aos="fade-up">
              <span className="text-accent font-semibold uppercase tracking-wider">Careers</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-6">
                Join Our Team of Experts
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We're always looking for talented professionals to join our team. At PACT Consultancy, you'll work on challenging projects, collaborate with exceptional colleagues, and develop your expertise while making a meaningful impact for our clients.
              </p>
              <a
                href="/news"
                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  e.preventDefault();
                  window.location.href = "/news";
                }}
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-all"
              >
                <span>View Open Positions</span>
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div className="md:w-1/2" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-dark mb-5">Why Join PACT?</h3>

                <div className="space-y-5">
                  <div className="flex">
                    <div className="rounded-full bg-primary/10 text-primary w-12 h-12 flex-shrink-0 flex items-center justify-center mr-4">
                      <i className="fas fa-lightbulb text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">Challenging Work</h4>
                      <p className="text-gray-600">Tackle complex challenges across industries and develop innovative solutions.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="rounded-full bg-primary/10 text-primary w-12 h-12 flex-shrink-0 flex items-center justify-center mr-4">
                      <i className="fas fa-chart-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">Growth Opportunities</h4>
                      <p className="text-gray-600">Continuous learning, professional development, and clear career progression.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="rounded-full bg-primary/10 text-primary w-12 h-12 flex-shrink-0 flex items-center justify-center mr-4">
                      <i className="fas fa-users text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">Collaborative Culture</h4>
                      <p className="text-gray-600">Work alongside talented colleagues in a supportive and diverse environment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;