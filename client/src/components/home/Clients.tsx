import { type FC } from 'react';
import TabbedClients from '@/components/clients/TabbedClients';

const Clients: FC = () => {
  return (
    <section id="clients" className="pt-16 md:pt-20 md:pb-6 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Key Clients & Associates</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
          PACT provides technical assistance to International Development Organizations, State Governments & Corporations, Central Banks & Financial Sector Regulators, Microfinance Institutions, Banking Institutions, and International NGOs in collaboration with various associates.
          </p>
        </div>
        
        <TabbedClients />
      </div>
    </section>
  );
};

export default Clients;
