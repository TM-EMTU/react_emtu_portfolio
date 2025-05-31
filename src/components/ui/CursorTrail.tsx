import React, { useEffect, useRef } from 'react';

const CursorTrail: React.FC = () => {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const pointsRef = useRef<{ x: number, y: number }[]>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-container');
    trail.style.position = 'fixed';
    trail.style.top = '0';
    trail.style.left = '0';
    trail.style.width = '100%';
    trail.style.height = '100%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    document.body.appendChild(trail);
    cursorRef.current = trail;
    
    // Create trail points
    const numPoints = 10;
    for (let i = 0; i < numPoints; i++) {
      const point = document.createElement('div');
      point.classList.add('cursor-trail');
      point.style.opacity = `${1 - i * 0.1}`;
      point.style.width = `${8 - i * 0.5}px`;
      point.style.height = `${8 - i * 0.5}px`;
      trail.appendChild(point);
      trailRef.current.push(point);
      pointsRef.current.push({ x: 0, y: 0 });
    }
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Update first point to current mouse position
      pointsRef.current[0] = { x: e.clientX, y: e.clientY };
    };
    
    // Animation loop
    const updateTrail = () => {
      // Update all points after the first one
      for (let i = 1; i < trailRef.current.length; i++) {
        // Smoothly follow the previous point
        pointsRef.current[i] = {
          x: pointsRef.current[i].x + (pointsRef.current[i-1].x - pointsRef.current[i].x) * 0.2,
          y: pointsRef.current[i].y + (pointsRef.current[i-1].y - pointsRef.current[i].y) * 0.2
        };
      }
      
      // Update DOM elements
      for (let i = 0; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        point.style.transform = `translate(${pointsRef.current[i].x}px, ${pointsRef.current[i].y}px)`;
      }
      
      requestAnimationFrame(updateTrail);
    };
    
    // Connect lines between points
    let isConnecting = false;
    const handleClick = () => {
      if (!isConnecting) {
        isConnecting = true;
        
        // Highlight the connection during the click
        for (let i = 0; i < trailRef.current.length; i++) {
          const point = trailRef.current[i];
          point.style.backgroundColor = 'rgba(111, 76, 255, 0.8)';
          point.style.width = '10px';
          point.style.height = '10px';
        }
        
        // Reset after animation
        setTimeout(() => {
          for (let i = 0; i < trailRef.current.length; i++) {
            const point = trailRef.current[i];
            point.style.backgroundColor = 'rgba(111, 76, 255, 0.6)';
            point.style.width = `${8 - i * 0.5}px`;
            point.style.height = `${8 - i * 0.5}px`;
          }
          isConnecting = false;
        }, 300);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    requestAnimationFrame(updateTrail);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (cursorRef.current) {
        document.body.removeChild(cursorRef.current);
      }
    };
  }, []);
  
  return null;
};

export default CursorTrail;