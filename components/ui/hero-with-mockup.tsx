'use client';

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroWithMockupProps {
  title: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  mockupImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  metrics?: Array<{
    value: number;
    label: string;
    suffix?: string;
  }>;
  className?: string;
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/contact",
  },
  secondaryCta = {
    text: "Explore Services",
    href: "/services",
    icon: <ArrowRight className="ml-2 h-4 w-4" />,
  },
  mockupImage,
  metrics,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative bg-background text-foreground",
        "py-16 px-4 md:py-24 lg:py-32",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6 pt-8 md:pt-16 lg:gap-8">
            {/* Subtitle */}
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-1 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-primary">
              Data-Driven SaaS Consulting
            </span>
            
            {/* Heading */}
            <h1
              className={cn(
                "inline-block",
                "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
                "bg-clip-text text-transparent",
                "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
                "leading-[1.1] sm:leading-[1.1]",
                "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
              )}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              className={cn(
                "max-w-[550px]",
                "text-base sm:text-lg",
                "text-muted-foreground",
                "font-medium",
              )}
            >
              {description}
            </p>

            {/* Metrics */}
            {metrics && (
              <div className="flex flex-wrap gap-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="metric" data-value={metric.value} aria-label={`${metric.value}${metric.suffix || ''} ${metric.label}`}>
                    <span className="text-3xl font-bold text-primary dark:text-primary-light">
                      <span className="counter" aria-hidden="true">{metric.value}</span>{metric.suffix || ''}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className={cn(
                  "bg-gradient-to-b from-primary to-primary/90 dark:from-primary/90 dark:to-primary/80",
                  "hover:from-primary/95 hover:to-primary/85 dark:hover:from-primary/80 dark:hover:to-primary/70",
                  "text-white shadow-lg",
                  "transition-all duration-300",
                )}
              >
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  "border-2 border-primary text-primary",
                  "hover:bg-primary hover:text-white",
                  "transition-all duration-300",
                )}
              >
                <Link href={secondaryCta.href} className="flex items-center">
                  {secondaryCta.text}
                  {secondaryCta.icon}
                </Link>
              </Button>
            </div>
          </div>

          {/* Mockup Section */}
          <div className="relative w-full">
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Image
                {...mockupImage}
                className="w-full h-auto"
                loading="eager"
                priority
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simplified background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 dark:bg-secondary/10 rounded-tr-[100px]"></div>
      </div>
    </section>
  );
}
