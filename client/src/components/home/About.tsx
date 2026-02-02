import { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import { Award, Globe, Users, Handshake, CheckCircle, Calendar, Briefcase, Target, Lightbulb, Shield, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton, TextSkeleton, FeatureSkeleton } from '@/components/ui/ContentSkeleton';

// Define the AboutContent interface
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
}

const FeatureItem = ({
  icon,
  title,
  description,
  index
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  index: number
}) => {
  return (
    <div
      className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={100 + (index * 100)}
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 mt-1 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-navy-800 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // button now navigates to the About page instead of opening a dialog
  const featureIcons: Record<string, React.ReactNode> = {
    CheckCircle: <CheckCircle className="h-5 w-5" />,
    Award: <Award className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Handshake: <Handshake className="h-5 w-5" />,
    Briefcase: <Briefcase className="h-5 w-5" />
  };

  // Default values for vision, mission, and core values
  const defaultVision = "To leverage our global synergy and expertise to provide leading, innovative and distinctive development consulting and technical assistance.";
  const defaultMission = "To empower communities socially and economically.";
  const defaultCoreValues = [
    "Expertise",
    "Integrity",
    "Excellence",
    "Sustainable Transformation & Empowerment",
    "Respect"
  ];

  // Fetch about content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/about-content', {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`API response error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Ensure we have vision, mission, and core_values by providing defaults if missing
          const processedData = {
            ...data.data,
            vision: data.data.vision || defaultVision,
            mission: data.data.mission || defaultMission,
            core_values: data.data.core_values || defaultCoreValues
          };
          setContent(processedData);
        } else {
          // Use default content if API call fails or returns empty data
          setContent({
            id: 0,
            title: 'About PACT Consultancy',
            subtitle: 'Who We Are',
            description: 'At PACT Consultancy, we partner with organizations to design strategies, build capabilities, and deliver sustainable change. Our tailored approach drives growth, resilience, and impact in an ever-evolving world.\n\nWe bring over 15+ years of consulting excellence, with multisector expertise across Finance, Governance, Health, and beyond, supported by global and regional partnerships.',
            vision: defaultVision,
            mission: defaultMission,
            core_values: defaultCoreValues,
            features: [
              { title: 'Custom Strategies', description: 'Tailored to your specific needs', icon: 'CheckCircle' },
              { title: 'Expert Team', description: 'Highly skilled professionals', icon: 'Users' },
              { title: 'Proven Results', description: 'Measurable outcomes', icon: 'Award' },
              { title: 'Global Network', description: 'Worldwide partnerships', icon: 'Globe' }
            ]
          });
        }
      } catch (error) {
        // Set default content on error
        setContent({
          id: 0,
          title: 'About PACT Consultancy',
          subtitle: 'Who We Are',
          description: 'At PACT Consultancy, we partner with organizations to design strategies, build capabilities, and deliver sustainable change. Our tailored approach drives growth, resilience, and impact in an ever-evolving world.',
          vision: defaultVision,
          mission: defaultMission,
          core_values: defaultCoreValues,
          features: [
            { title: 'Custom Strategies', description: 'Tailored to your specific needs', icon: 'CheckCircle' },
            { title: 'Expert Team', description: 'Highly skilled professionals', icon: 'Users' },
            { title: 'Proven Results', description: 'Measurable outcomes', icon: 'Award' },
            { title: 'Global Network', description: 'Worldwide partnerships', icon: 'Globe' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading || !content) {
    return (
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          {/* Loading Header Skeleton */}
          <div className="text-center mb-8 space-y-3">
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-1 w-24 mx-auto" />
          </div>

          {/* Loading Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <Skeleton className="h-8 w-48" />
                <TextSkeleton lines={4} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <FeatureSkeleton />
                  <FeatureSkeleton />
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Vision Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <TextSkeleton lines={2} />
                </div>
                {/* Mission Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <TextSkeleton lines={1} />
                </div>
                {/* Core Values Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-40" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-10 w-full rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get paragraphs from description - handle both \r\n and \n line breaks
  const paragraphs = content.description
    ?.replace(/\r\n/g, '\n') // Convert Windows line breaks to Unix
    ?.replace(/\r/g, '\n')   // Also handle lone \r characters
    ?.split(/\n\n+/)         // Split on one or more blank lines
    ?.filter(paragraph => paragraph.trim() !== '') || []; // Only keep non-empty paragraphs

  // Get only the first paragraph for the home page preview
  const previewText = paragraphs[0] || '';

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* About Section Header */}
        <div className="text-center mb-8">
          <h3 className="text-primary uppercase tracking-wide text-sm font-semibold mb-2">{content.subtitle}</h3>
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            About <span className="text-primary">PACT</span> Consultancy
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Main Content Section - Redesigned Layout */}
        <div className="space-y-8">
          {/* Top Section: Who We Are (Left) + Vision & Mission (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Who We Are Section */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-500 hover:shadow-xl flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4 flex items-center">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary mr-3" />
                Who We Are
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 flex-grow">
                {previewText}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {content.features && content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-primary/50 transition-all duration-500 hover:shadow-md hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={100 + (index * 100)}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 transition-transform duration-500 hover:scale-110 hover:rotate-6">
                      {featureIcons[feature.icon as keyof typeof featureIcons] || <CheckCircle className="h-5 w-5" />}
                    </div>
                    <h4 className="font-semibold text-navy-800 mb-2 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* More Details Button */}
              <div className="mt-auto flex justify-center">
                <Link
                  href="/about"
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-500 shadow-md hover:shadow-lg"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            {/* Right: Vision and Mission Stacked */}
            <div className="flex flex-col gap-6 h-full">
              {/* Vision */}
              <div className="bg-gradient-to-br from-primary/5 to-white p-6 sm:p-8 rounded-lg shadow-md border-l-4 border-primary transition-all duration-500 hover:shadow-xl hover:border-primary/80 flex-1 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <Target className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-navy-800">
                    Vision
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic flex-grow">
                  {content.vision || defaultVision}
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-primary/5 to-white p-6 sm:p-8 rounded-lg shadow-md border-l-4 border-primary transition-all duration-500 hover:shadow-xl hover:border-primary/80 flex-1 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-navy-800">
                    Mission
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic flex-grow">
                  {content.mission || defaultMission}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values - Professional Single Row */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <Award className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-navy-800">
                Our Core Values
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {(content.core_values || defaultCoreValues).map((value, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-lg border-2 border-slate-200 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 p-5 sm:p-6 flex items-center justify-center"
                  data-aos="fade-up"
                  data-aos-delay={100 + (index * 80)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary transition-all duration-500"></div>
                  <h5 className="font-bold text-navy-800 text-sm sm:text-base text-center leading-tight">
                    {value}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
