import { useEffect } from 'react';
import Contact from '@/components/home/Contact';

const ContactPage = () => {
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
      <div className="bg-primary text-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              Reach out to our team to discuss how we can help your organization tackle challenges and seize opportunities.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default ContactPage;
