import expertiseAreas from '@/data/expertise';
import { ExpertiseArea } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const ExpertiseItem = ({ area }: { area: ExpertiseArea }) => {
  return (
    <div 
      className="expertise-item bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-50 group"
      data-aos="fade-up"
    >
      <div className="rounded-xl bg-primary/5 text-primary w-16 h-16 flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
        <i className={`fas ${area.icon} text-2xl`}></i>
      </div>
      
      <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
        {area.title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {area.description}
      </p>
      
      <ul className="border-t border-gray-100 pt-6 mb-6">
        {area.capabilities.slice(0, 3).map((capability: string, index: number) => (
          <li key={index} className="flex items-start mb-3 text-gray-600">
            <span className="text-accent mr-3 font-bold text-lg leading-none">•</span>
            <span>{capability}</span>
          </li>
        ))}
        {area.capabilities.length > 3 && (
          <li className="text-primary text-sm font-semibold mt-2">
            + {area.capabilities.length - 3} more capabilities
          </li>
        )}
      </ul>
      
      <a 
        href={`/expertise#${area.id}`}
        className="inline-flex items-center text-primary font-medium hover:text-accent group/link transition-colors"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `/expertise#${area.id}`;
        }}
      >
        <span>Learn more</span>
        <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

const Expertise = () => {
  return (
    <section id="expertise" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="md:max-w-2xl mb-8 md:mb-0" data-aos="fade-up">
            <span className="inline-block text-accent font-semibold mb-2 uppercase tracking-wider">What we do best</span>
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-5 leading-tight">
              Our Areas of <span className="text-accent">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              PACT delivers specialized expertise across multiple sectors, enabling transformative results for organizations of all types.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <a 
              href="/expertise" 
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-all group"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/expertise";
              }}
            >
              <span>View All Expertise</span>
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Expertise Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <ExpertiseItem 
              key={area.id} 
              area={area}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
            Need expertise in a specific sector?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team has experience across a wide range of industries and can tailor solutions to your specific needs.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-medium rounded-md transition-all group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/contact";
            }}
          >
            <span>Contact Our Team</span>
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
