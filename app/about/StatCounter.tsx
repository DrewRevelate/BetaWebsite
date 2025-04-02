'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 150, label: 'Companies Transformed', suffix: '+', icon: 'fa-building' },
  { value: 35, label: 'Average Revenue Growth', suffix: '%', icon: 'fa-chart-line' },
  { value: 300, label: 'Trailhead Badges', suffix: '+', icon: 'fa-award' },
  { value: 85, label: 'Data Utilization Increase', suffix: '%', icon: 'fa-database' }
];

const StatCounter = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      {
        root: null,
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const incrementValue = stat.value / totalFrames;
      
      let currentFrame = 0;
      
      const counter = setInterval(() => {
        currentFrame++;
        const newValue = Math.min(Math.ceil(incrementValue * currentFrame), stat.value);
        
        setCounters(prevCounters => {
          const newCounters = [...prevCounters];
          newCounters[index] = newValue;
          return newCounters;
        });
        
        if (currentFrame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  };

  return (
    <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className={`fas ${stat.icon} text-primary text-xl`}></i>
          </div>
          
          <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            {counters[index]}{stat.suffix}
          </div>
          
          <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatCounter;
