import { RefObject, useEffect, useState } from 'react';

export const useParallax = (ref: RefObject<HTMLElement>, amount: number = 10) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width * amount;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height * amount;
      
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, amount]);

  return coords;
}; 