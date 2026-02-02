import { useEffect, useState } from 'react';
import { Target, Globe, CheckCircle, Award, Users, Briefcase, Handshake, MapPin } from 'lucide-react';
import { apiClient } from '@/api/client';
import { stripHtml } from '@/lib/utils';

// Define interfaces for the data we'll fetch
// A simplified, stable About page. This replaces a corrupted/markdown-wrapped file.
// It fetches about content and renders minimal information so the /about route
// always displays useful content. We can restore the full original layout later.

interface AboutContent {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
}

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchAbout = async () => {
      try {
        const res = await apiClient.get('/about-content');
        if (mounted && res?.data?.success && res.data.data) {
          setAboutContent(res.data.data);
        }
      } catch (err) {
        // log and proceed with defaults
        console.error('Failed to fetch about content', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAbout();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">{aboutContent?.title || 'About PACT Consultancy'}</h1>
        <p className="text-lg text-gray-700 mb-6">{aboutContent?.subtitle || 'Who we are'}</p>
        <div className="prose max-w-none text-left text-gray-700">
          <p>{aboutContent?.description ? stripHtml(aboutContent.description).slice(0, 1000) : 'PACT Consultancy is a development consulting firm delivering technical assistance and capacity building.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;