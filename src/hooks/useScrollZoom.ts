import { RefObject, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface ZoomState {
  scale: number;
  translateY: number;
  blur: number;
}

export const useScrollZoom = (ref: RefObject<HTMLElement>, zoomFactor: number = 1.15) => {
  const [state, setState] = useState<ZoomState>({
    scale: 1,
    translateY: 0,
    blur: 0
  });
  const [isHovered, setIsHovered] = useState(false);

  const updateState = useCallback((newState: Partial<ZoomState>) => {
    requestAnimationFrame(() => {
      setState(prevState => ({
        ...prevState,
        ...newState,
      }));
    });
  }, []);

  const debouncedScroll = useCallback(
    debounce((rect: DOMRect, viewHeight: number) => {
      if (isHovered) return;

      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(viewHeight / 2 - elementCenter);
      const maxDistance = viewHeight / 2 + rect.height / 2;
      
      const progress = 1 - Math.min(distanceFromCenter / maxDistance, 1);
      const targetScale = 1 + (zoomFactor - 1) * progress;
      const targetTranslateY = progress * -5; // Subtle upward movement
      const targetBlur = (1 - progress) * 0.5; // Subtle blur effect
      
      updateState({
        scale: targetScale,
        translateY: targetTranslateY,
        blur: targetBlur
      });
    }, 16),
    [isHovered, zoomFactor, updateState]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      debouncedScroll(rect, window.innerHeight);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      updateState({
        scale: zoomFactor * 1.04,
        translateY: -10,
        blur: 0
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      requestAnimationFrame(() => {
        setState(prevState => ({
          ...prevState,
          scale: 1,
          translateY: 0,
          blur: 0,
          transition: 'all 1200ms cubic-bezier(0.4, 0, 0.2, 1)'
        }));
      });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('scroll', handleScroll);
      debouncedScroll.cancel();
    };
  }, [ref, zoomFactor, isHovered, debouncedScroll, updateState]);

  return state;
}; 