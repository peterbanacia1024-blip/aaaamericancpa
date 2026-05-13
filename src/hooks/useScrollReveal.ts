import { useEffect, useRef, useState, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

/** CSS classes for scroll reveal animation */
export const revealClasses = (isVisible: boolean, delay?: string) =>
  `transition-all duration-700 ${delay ?? ""} ${
    isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8"
  }`;

/** Component wrapper for easy scroll reveal */
export function useMultiReveal(count: number) {
  const refs: Array<ReturnType<typeof useScrollReveal>> = [];
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refs.push(useScrollReveal());
  }
  return refs;
}
