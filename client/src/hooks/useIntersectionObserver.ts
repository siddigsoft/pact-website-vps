import { useState, useEffect, useCallback, useRef } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * A hook that observes when an element enters the viewport
 * @param options The IntersectionObserver options
 * @returns [isVisible, ref] A tuple with the visibility state and a ref to attach to the observed element
 */
export const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback ref to set the element
  const ref = useCallback((node: Element | null) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  useEffect(() => {
    if (!element) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    // Observe element
    observerRef.current.observe(element);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [element, threshold, rootMargin]);

  return [isVisible, ref] as const;
};

export default useIntersectionObserver;