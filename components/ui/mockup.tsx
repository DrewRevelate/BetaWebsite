'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MockupProps {
  children: React.ReactNode;
  className?: string;
}

export function Mockup({ children, className }: MockupProps) {
  return (
    <div className={cn('rounded-xl overflow-hidden border bg-background shadow-xl', className)}>
      {/* Browser-like header */}
      <div className="bg-muted/80 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 flex-1 h-5 bg-background/30 rounded-md"></div>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
