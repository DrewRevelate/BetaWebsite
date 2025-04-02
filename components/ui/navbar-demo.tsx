"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/services">Web Development</HoveredLink>
            <HoveredLink href="/services">Interface Design</HoveredLink>
            <HoveredLink href="/services">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/services">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Data Analytics"
              href="/services"
              src="/images/data-analytics.jpg"
              description="Transform your data into actionable insights."
            />
            <ProductItem
              title="Process Optimization"
              href="/services"
              src="/images/process-optimization.jpg"
              description="Streamline operations and improve efficiency."
            />
            <ProductItem
              title="Technology Integration"
              href="/services"
              src="/images/tech-integration.jpg"
              description="Seamlessly integrate the latest technologies."
            />
            <ProductItem
              title="Strategy Consulting"
              href="/services"
              src="/images/strategy-consulting.jpg"
              description="Develop data-driven strategies for growth."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Approach">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/approach">Discovery</HoveredLink>
            <HoveredLink href="/approach">Analysis</HoveredLink>
            <HoveredLink href="/approach">Implementation</HoveredLink>
            <HoveredLink href="/approach">Optimization</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">Our Story</HoveredLink>
            <HoveredLink href="/about">Team</HoveredLink>
            <HoveredLink href="/about">Values</HoveredLink>
            <HoveredLink href="/contact">Contact Us</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}