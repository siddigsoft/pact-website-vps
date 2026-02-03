import { useEffect, useState } from 'react';
import { Target, Globe, CheckCircle, Award, Users, Briefcase, Handshake, MapPin } from 'lucide-react';
import { apiClient } from '@/api/client';
import { stripHtml } from '@/lib/utils';

// Define interfaces for the data we'll fetch
interface AboutContent {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  vision?: string;
  mission?: string;
  core_values?: string[];
  features?: {
    title: string;
    description: string;
    icon: string;
  }[];
  client_retention_rate?: number;
}

interface ImpactStat {
  id: number;
  title: string;
  value: number;
  icon: string;
  prefix?: string;
  suffix?: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  social_links?: Record<string, string>;
}

interface Project {
  id: number;
  title: string;
  description: string;
  organization: string;
  location?: string;
  duration?: string;
  image?: string;
  bg_image?: string;
}

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Map icons to their components
  const featureIcons: Record<string, React.ReactNode> = {
    CheckCircle: <CheckCircle className="h-5 w-5" />,
    Award: <Award className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Handshake: <Handshake className="h-5 w-5" />,
    Briefcase: <Briefcase className="h-5 w-5" />
  };

  // Initialize AOS when component mounts
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
  }, []);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch about content
        const aboutResponse = await apiClient.get('/about-content');
        if (aboutResponse.data.success) {
          setAboutContent(aboutResponse.data.data);
        }

        // Fetch impact stats
        const statsResponse = await apiClient.get('/impact-stats');
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }

        // Fetch team members
        const teamResponse = await apiClient.get('/team');
        if (teamResponse.data.success) {
          setTeamMembers(teamResponse.data.data);
        }

        // Fetch projects
        const projectsResponse = await apiClient.get('/content/projects');
        if (projectsResponse.data.success) {
          setProjects(projectsResponse.data.data.slice(0, 3)); // Get just a few featured projects
        }
      } catch (error) {
        console.error('Error fetching about page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Parse description paragraphs
  const getDescriptionParagraphs = (description?: string) => {
    if (!description) return [];
    return description
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split(/\n\n+/)
      .filter(paragraph => paragraph.trim() !== '');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Default values if API doesn't return data
  const defaultVision = "To leverage our global synergy and expertise to provide leading, innovative and distinctive development consulting and technical assistance.";
  const defaultMission = "To empower communities socially and economically.";
  const defaultCoreValues = [
    "Expertise",
    "Integrity", 
    "Excellence", 
    "Sustainable Transformation & Empowerment", 
    "Respect"
  ];

  const vision = aboutContent?.vision || defaultVision;
  const mission = aboutContent?.mission || defaultMission;
  const coreValues = aboutContent?.core_values || defaultCoreValues;
  const paragraphs = getDescriptionParagraphs(aboutContent?.description);

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6" data-aos="fade-up">
              {aboutContent?.title || "About PACT Consultancy"}
            </h1>
            <p className="text-lg sm:text-xl opacity-90" data-aos="fade-up" data-aos-delay="100">
              {aboutContent?.subtitle || "Who We Are"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Left Column - Description */}
            <div className="lg:col-span-7 flex flex-col" data-aos="fade-right">
              {/* Description Text */}
              <div className="mb-6 sm:mb-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 sm:mb-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {aboutContent?.features && aboutContent.features.map((feature, index) => (
                  <div key={index} className="flex space-x-3 sm:space-x-4" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {featureIcons[feature.icon as keyof typeof featureIcons] || <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-1">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Vision, Mission, Values */}
            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full h-full flex flex-col justify-between">
                {/* Vision */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3" />
                    <h4 className="text-lg sm:text-xl font-semibold text-navy-800 pb-1 border-b-2 border-primary">
                      Vision / Core Purpose
                    </h4>
                  </div>
                  <p className="italic text-gray-700 pl-7 sm:pl-9 border-l-2 border-primary/30 py-2 text-sm sm:text-base">
                    {vision}
                  </p>
                </div>

                {/* Mission */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3" />
                    <h4 className="text-lg sm:text-xl font-semibold text-navy-800 pb-1 border-b-2 border-primary">
                      Mission
                    </h4>
                  </div>
                  <p className="italic text-gray-700 pl-7 sm:pl-9 border-l-2 border-primary/30 py-2 text-sm sm:text-base">
                    {mission}
                  </p>
                </div>

                {/* Core Values */}
                <div>
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3" />
                    <h4 className="text-lg sm:text-xl font-semibold text-navy-800 pb-1 border-b-2 border-primary">
                      Core Values
                    </h4>
                  </div>
                  <ul className="pl-9 sm:pl-12 list-disc space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    {coreValues.map((value, index) => (
                      <li key={index} className="leading-relaxed">{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Company Image Section */}
          {aboutContent?.image && (
            <div className="mb-12 sm:mb-16" data-aos="fade-up">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={aboutContent.image} 
                  alt="About PACT Consultancy" 
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute inset-0 bg-primary/10"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact Statistics Section */}
      {stats.length > 0 && (
        <section className="py-12 sm:py-16 bg-navy-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Impact</h2>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                We've made a significant difference through our work around the world
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 sm:p-6 bg-navy-700/50 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <p className="text-base sm:text-lg">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Team</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the experts behind PACT Consultancy
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.slice(0, 6).map((member, index) => (
                <div 
                  key={index}
                  className="bg-slate-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {member.image && (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-48 sm:h-64 object-cover object-center"
                    />
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3 sm:mb-4 text-sm sm:text-base">{member.position}</p>
                    {member.bio && <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Featured Projects</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Some of our recent impactful work around the world
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {project.image && (
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-gray-500">{project.location || 'Global'}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">{stripHtml(project.description)}</p>
                    <p className="text-sm font-medium text-navy-800">{project.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" data-aos="fade-up">Ready to Work Together?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Partner with us to design strategies, build capabilities, and deliver sustainable change
          </p>
          <a 
            href="/contact" 
            className="inline-block px-6 sm:px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:bg-navy-900 hover:text-white transition-colors duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 