'use client';

import { FC, memo } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  index: number;
}

export const ServiceCard: FC<ServiceCardProps> = memo(function ServiceCard({
  title,
  description,
  icon,
  link,
  index
}) {
  return (
    <div 
      className="service-card" 
      data-aos="fade-up" 
      data-aos-delay={index * 100}
    >
      <div className="service-icon w-[60px] h-[60px] bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] text-white rounded-lg flex items-center justify-center text-xl mb-4">
        <i className={icon} aria-hidden="true"></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <Link 
        href={link} 
        className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold group"
        aria-label={`Learn more about ${title}`}
      >
        <span>Learn More</span>
        <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
      </Link>
    </div>
  );
});
