import { useEffect } from 'react';
import { Link } from 'wouter';
import CTA from '@/components/home/CTA';
import testimonials from '@/data/testimonials';
import TabbedClients from '@/components/clients/TabbedClients';

const ClientsPage = () => {
  // Only scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="bg-primary text-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Key Clients & Associates</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
            PACT provides technical assistance to International Development Organizations, State Governments & Corporations, Central Banks & Financial Sector Regulators, Microfinance Institutions, Banking Institutions, and International NGOs in collaboration with various associates.
            </p>
            <Link href="/contact" className="bg-white text-primary hover:bg-white/90 py-2.5 sm:py-3 px-6 sm:px-8 rounded-md font-medium inline-block transition-all text-sm sm:text-base">
              Become Our Client
            </Link>
          </div>
        </div>
      </div>
      
      {/* Tabbed Clients Section */}
      <div className="clients-section">
        <TabbedClients key="clients-page-tabbed-clients" />
      </div>
 
      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default ClientsPage;
