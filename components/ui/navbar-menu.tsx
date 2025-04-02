"use client";

import React, { useEffect, useState, useRef, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Optimized motion animation with better performance
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Memoized MenuItem component to prevent unnecessary re-renders
export const MenuItem = memo(({
  setActive,
  active,
  item,
  children,
  className,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<'left' | 'center' | 'right'>('center');
  
  // Effect to check position on window and determine best dropdown placement
  useEffect(() => {
    if (!itemRef.current) return;
    
    const updatePosition = () => {
      if (!itemRef.current) return;
      
      const rect = itemRef.current.getBoundingClientRect();
      const centerPoint = rect.left + rect.width / 2;
      const windowWidth = window.innerWidth;
      
      // If the item is in the first third of the screen, align dropdown to the left
      if (centerPoint < windowWidth / 3) {
        setMenuPosition('left');
      } 
      // If the item is in the last third of the screen, align dropdown to the right
      else if (centerPoint > (windowWidth * 2) / 3) {
        setMenuPosition('right');
      } 
      // Otherwise center the dropdown
      else {
        setMenuPosition('center');
      }
    };
    
    // Initial position check
    updatePosition();
    
    // Update position on resize
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Get transform and position styles based on calculated position
  const getPositionStyles = () => {
    switch (menuPosition) {
      case 'left':
        return { left: '0', transform: 'translateX(0)' };
      case 'right':
        return { right: '0', transform: 'translateX(0)' };
      case 'center':
      default:
        return { left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div 
      ref={itemRef}
      onMouseEnter={() => setActive(item)}
      onFocus={() => setActive(item)} 
      className={cn("relative", className)}
      role="menuitem"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white dark:hover:text-primary-light focus:outline-none px-4 py-2 relative hover:before:w-full before:w-0 before:h-[2px] before:bg-primary before:absolute before:bottom-0 before:left-0 before:transition-all before:duration-300 font-medium"
        tabIndex={0}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
            ...transition,
                  duration: 0.3,
                }}
              >
          {active === item && (
            <div 
              className="absolute top-[calc(100%_+_0.8rem)] pt-2"
              style={getPositionStyles()}
              role="menu"
            >
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100/30 dark:border-gray-700/30 shadow-lg animate-in fade-in duration-300"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
});

// Memoized Menu component
export const Menu = memo(({
  setActive,
  children,
  ...props
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      onBlur={(e) => {
        // Only reset active state if focus moves outside the menu
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setActive(null);
        }
      }}
      className={cn(
        "relative",
        "bg-transparent", 
        "flex justify-center px-4 py-4",
        "transition-all duration-300"
      )}
      role="menubar"
      {...props}
    >
      {children}
    </nav>
  );
});

// Memoized ProductItem component
export const ProductItem = memo(({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link 
      href={href} 
      className="flex space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-lg"
        loading="lazy"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
});

// Improved HoveredLink component with better accessibility and transitions
export const HoveredLink = memo(({ children, ...rest }: any) => {
  const router = useRouter();
  
  // Handle click to force the page to reload if we're already on that page
  // This ensures the hash fragment is respected even on the same page
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = rest.href;
    
    // Close active menu when link is clicked
    document.body.click(); // This will trigger mouseLeave on Menu component
    
    // Use router to navigate
    router.push(href);
  };
  
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white p-2 rounded-md transition-colors duration-300 block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
});