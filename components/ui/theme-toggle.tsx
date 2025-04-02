"use client";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { getResolvedTheme } from "@/components/theme/theme-mode";
import { useState, useEffect, memo } from "react";

/**
 * Theme toggle button that switches between light and dark mode
 * Uses local storage to persist theme preferences
 * Enhanced with improved accessibility and focus states
 */
const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  
  // Only render toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setResolvedTheme(getResolvedTheme());
  }, []);
  
  // Update resolved theme when theme changes
  useEffect(() => {
    if (mounted) {
      setResolvedTheme(getResolvedTheme());
    }
  }, [theme, mounted]);
  
  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Placeholder to prevent layout shift
  }
  
  return (
    <div className="flex items-center space-x-2">
      <Toggle
        variant="outline"
        className="group w-10 h-10 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 data-[state=on]:bg-transparent data-[state=on]:hover:bg-gray-100/80 dark:data-[state=on]:hover:bg-gray-800/80 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        pressed={resolvedTheme === "light"}
        onPressedChange={() => {
          const newTheme = resolvedTheme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
        aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`}
        title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`}
      >
        {resolvedTheme === "light" ? (
          <Sun
            size={20}
            strokeWidth={2}
            className="shrink-0 transition-all text-amber-600"
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={20}
            strokeWidth={2}
            className="shrink-0 transition-all text-indigo-300"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {resolvedTheme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        </span>
      </Toggle>
    </div>
  );
});

export { ThemeToggle };
