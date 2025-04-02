'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlowProps {
  variant?: 'center' | 'above' | 'below';
  className?: string;
}

export function Glow({ variant = 'center', className }: GlowProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0',
        {
          'bg-gradient-radial from-primary/20 via-primary/10 to-transparent': variant === 'center',
          'bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent': variant === 'above',
          'bg-gradient-to-t from-primary/20 via-secondary/10 to-transparent': variant === 'below'
        },
        className
      )}
      aria-hidden="true"
    />
  );
}
