import { useState, useEffect } from 'react';

interface ScrollEffectOptions {
  threshold?: number;
}

export const useScrollEffect = (options: ScrollEffectOptions = {}) => {
  const { threshold = 50 } = options;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
};

export default useScrollEffect;
