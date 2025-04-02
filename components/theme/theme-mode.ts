'use client';

type Theme = 'light' | 'dark' | 'system';

/**
 * Get the current theme mode
 * This checks localStorage first, then falls back to system preference
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system';
  }
  
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  return storedTheme || 'system';
}

/**
 * Get the resolved theme (light or dark only, no system)
 * This resolves the 'system' value to either light or dark based on the system preference
 */
export function getResolvedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  
  const theme = getTheme();
  
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return theme;
}

/**
 * Set the theme mode
 * This updates localStorage and applies the CSS classes
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

/**
 * Apply the theme to the document
 * This adds/removes CSS classes to/from the HTML element
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

/**
 * Toggle between light and dark theme
 * This will toggle between light and dark, ignoring system preference
 */
export function toggleTheme(): void {
  const currentTheme = getResolvedTheme();
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/**
 * Setup theme change listener for system preference changes
 * This will update the theme when the system preference changes
 */
export function setupThemeListener(): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const listener = (e: MediaQueryListEvent) => {
    if (getTheme() === 'system') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', listener);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', listener);
}
