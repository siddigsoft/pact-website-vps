import { useEffect } from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Clients from '@/components/home/Clients';
import News from '@/components/home/News';
import Contact from '@/components/home/Contact';
import CTA from '@/components/home/CTA';
import Statistics from '@/components/home/Statistics';
import RecentProjects from '@/components/projects/RecentProjects';

// Define the AboutContent interface
interface AboutContent {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  client_retention_rate: number;
}

const HomePage = () => {
  // Initialize AOS when component mounts
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
  }, []);

  return (
    <>
      <div style={{
        margin: '0 auto',
        paddingTop: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '50px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#999'
      }}>
        Page content begins here
      </div>
      
      <HeroSlider />
      <About />
      <Statistics />
      <Services />
      <RecentProjects />
      <Clients />
      <News />
      <Contact />
      <CTA />
    </>
  );
};

export default HomePage;
