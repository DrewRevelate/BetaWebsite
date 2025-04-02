'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, setTheme as setThemeMode, setupThemeListener } from './theme-mode';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize from localStorage when possible
    if (typeof window !== 'undefined') {
      return getTheme();
    }
    return defaultTheme;
  });

  // Setup theme change listeners
  useEffect(() => {
    const cleanupListener = setupThemeListener();
    return () => cleanupListener();
  }, []);

  // This function will be provided through context
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setThemeMode(newTheme);
  };

  // Context value
  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
