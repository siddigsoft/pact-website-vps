import { Link } from 'wouter';

const CTA = () => {
  return (
    <section className="py-12 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Background pattern" 
          className="w-full h-full object-cover"
        /> */}
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Drive Meaningful Change?</h2>
          <p className="text-xl text-white mb-8">
            Partner with PACT to create sustainable solutions that transform organizations and communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary hover:bg-white/90 font-medium py-3 px-8 rounded-md transition-all text-center">
              Schedule a Consultation
            </Link>
            <Link href="/services" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all text-center">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
