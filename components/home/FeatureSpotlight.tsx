'use client';

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeatureSpotlight() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden py-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-3 relative pb-2 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-10 after:bg-primary">
            Featured Solution
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
            See How Data Transforms Business Outcomes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Explore our interactive feature to discover how we help leading SaaS companies transform their data strategy and achieve remarkable growth.
          </p>
        </div>
      </div>
      
      <ContainerScroll
        titleComponent={
          <>
            <h3 className="text-4xl font-semibold text-black dark:text-white">
              Data-Driven Growth <br />
              <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                40% Revenue Increase
              </span>
            </h3>
            <p className="mt-4 max-w-xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300">
              Through data integration and analytics, we help companies unify their data silos and implement predictive models for increased customer retention.
            </p>
            <div className="mt-8">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center"
              >
                Talk To Our Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </>
        }
      >
        <Image
          src="/images/dashboard-illustration.svg"
          alt="Data Dashboard showing analytics charts and business metrics"
          height={720}
          width={1200}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          priority={false}
        />
      </ContainerScroll>
    </div>
  );
}
