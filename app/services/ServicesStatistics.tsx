'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Statistic {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  icon: string;
  color: string;
}

const statistics: Statistic[] = [
  {
    value: 85,
    label: 'Increase in CRM Adoption',
    suffix: '%',
    duration: 2000,
    icon: 'users',
    color: '#4361ee'
  },
  {
    value: 42,
    label: 'Reduction in Sales Cycle',
    suffix: '%',
    duration: 2200,
    icon: 'clock',
    color: '#3a56d4'
  },
  {
    value: 3.5,
    label: 'Average ROI Multiple',
    prefix: 'x',
    duration: 2400,
    icon: 'chart-line',
    color: '#4895ef'
  },
  {
    value: 90,
    label: 'Data Integration Success',
    suffix: '%',
    duration: 2600,
    icon: 'sync-alt',
    color: '#7209b7'
  }
];

const ServicesStatistics = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const countersInitialized = useRef(false);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const initCounters = () => {
      if (countersInitialized.current) return;

      const counters = document.querySelectorAll('.stat-value');
      
      const animateCounter = (counter: Element, target: number, duration: number, prefix = '', suffix = '') => {
        const startTimestamp = performance.now();
        const startValue = 0;
        
        // Easing function for smoother animation
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
        
        const step = (timestamp: number) => {
          if (!counter) return;
          
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easedProgress = easeOutQuart(progress);
          
          // For decimal values like 3.5, we need to handle differently
          let currentValue: number | string = 0;
          
          if (Number.isInteger(target)) {
            currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
          } else {
            // For decimal values, show one decimal place
            currentValue = (startValue + (target - startValue) * easedProgress).toFixed(1);
          }
          
          counter.textContent = `${prefix}${currentValue}${suffix}`;
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            // Add a little flourish at the end
            counter.classList.add('counter-complete');
            setTimeout(() => {
              counter.classList.remove('counter-complete');
            }, 500);
          }
        };
        
        window.requestAnimationFrame(step);
      };
      
      // Use Intersection Observer to trigger animation when stats are visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          controls.start("visible");
          countersInitialized.current = true;
          
          counters.forEach((counter, index) => {
            const stat = statistics[index];
            if (stat) {
              animateCounter(
                counter, 
                stat.value, 
                stat.duration || 2000, 
                stat.prefix || '', 
                stat.suffix || ''
              );
            }
          });
          
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      
      if (statsRef.current) {
        observer.observe(statsRef.current);
      }
    };
    
    initCounters();
    
    return () => {
      // Cleanup if needed
    };
  }, [controls]);
  
  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary z-0"></div>
      
      {/* Abstract patterns */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute w-full h-full" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '30px' }}></div>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl z-0 animate-pulse-slower"></div>
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-primary-light/30 rounded-full filter blur-3xl z-0 animate-pulse-slow"></div>
      
      {/* 3D Geometric Elements */}
      <motion.div 
        animate={{
          rotate: [12, 15, 12],
          transition: { 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }
        }}
        className="absolute top-1/3 right-10 w-32 h-32 rounded-xl bg-white/10 backdrop-blur-md rotate-12"
      ></motion.div>
      
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          transition: { 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }
        }}
        className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full bg-accent/20 backdrop-blur-sm"
      ></motion.div>
      
      {/* Mesh Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`, 
        backgroundSize: '60px 60px' 
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-5 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-wide uppercase text-white">Industry Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">RevOps Impact by the Numbers</h2>
          <p className="text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
            Real results achieved through strategic revenue operations implementation
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" 
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {statistics.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.2 },
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
              }}
              className="group relative text-center backdrop-blur-md rounded-2xl p-8 overflow-hidden transform perspective-1000"
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card background with 3D effect */}
              <div 
                className="absolute inset-0 bg-white/20 rounded-2xl border border-white/30 shadow-xl -z-10 transition-transform duration-500 ease-out group-hover:translate-z-8"
                style={{
                  transform: "translateZ(-5px)",
                  backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))`,
                }}
              ></div>
              
              {/* Background glow specific to each stat */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-30 -z-5"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color}80 0%, transparent 70%)`,
                  transform: "translateZ(-3px)",
                }}
              ></div>
              
              {/* 3D Icon with platform shadow */}
              <motion.div 
                className="relative mb-6 inline-flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ transformStyle: "preserve-3d" }}
                variants={floatingVariants}
                animate="animate"
              >
                {/* Platform shadow */}
                <div className="absolute bottom-0 w-12 h-2 bg-black/20 blur-sm rounded-full transform scale-75 opacity-70"></div>
                
                {/* 3D Platform */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:shadow-xl"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(5px)",
                    }}>
                  <i className={`fas fa-${stat.icon} text-white text-2xl transform group-hover:scale-110 transition-transform`}></i>
                </div>
              </motion.div>
              
              {/* Value with 3D effect */}
              <div className="mb-4 relative">
                <motion.span 
                  className="stat-value text-5xl font-bold text-white block transform transition-transform"
                  style={{
                    textShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transform: "translateZ(10px)",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.prefix || ''}0{stat.suffix || ''}
                </motion.span>
                
                {/* Highlight glow under number */}
                <div className="absolute -inset-2 bg-white/5 blur-md rounded-full -z-10"></div>
              </div>
              
              {/* Label with 3D effect */}
              <p 
                className="text-lg text-white/90 font-medium relative"
                style={{
                  transform: "translateZ(5px)",
                }}
              >{stat.label}</p>
              
              {/* Bottom decorative line with 3D effect */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, ${stat.color}, transparent)`,
                  transform: "translateZ(3px)",
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  transition: { 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }
                }}
              ></motion.div>
              
              {/* Corner accent dots */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/40"></div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/40"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/40"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/40"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated Stats Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.07 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-0"
        >
          <div className="text-white text-[180px] font-bold opacity-10 tracking-widest select-none">
            STATS
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesStatistics;