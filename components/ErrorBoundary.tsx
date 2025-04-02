'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, componentStack: string) => void;
  componentName?: string;
  shouldReset?: boolean;
  resetAfter?: number; // milliseconds
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Enhanced ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * Features:
 * - Detailed error reporting
 * - Auto-reset capability
 * - Optional error reporting callback
 * - Better fallback UI with dark mode support
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimer: NodeJS.Timeout | null = null;
  
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Set errorInfo in state
    this.setState({ errorInfo });
    
    // Log error to console
    console.error(`ErrorBoundary caught an error${this.props.componentName ? ` in ${this.props.componentName}` : ''}:`, error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Call optional error handler
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo.componentStack);
      } catch (handlerError) {
        console.error('Error in error handler:', handlerError);
      }
    }
    
    // Send to server
    this.reportErrorToServer(error, errorInfo);
    
    // Set up auto-reset if configured
    if (this.props.shouldReset && this.props.resetAfter) {
      this.resetTimer = setTimeout(() => {
        this.resetErrorBoundary();
      }, this.props.resetAfter);
    }
  }
  
  componentWillUnmount(): void {
    // Clear any pending reset timers
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }
  }
  
  /**
   * Report error to server for tracking
   */
  reportErrorToServer(error: Error, errorInfo: ErrorInfo): void {
    // Only report in production to avoid noise during development
    if (process.env.NODE_ENV === 'production') {
      try {
        const errorData = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          componentName: this.props.componentName || 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          timestamp: new Date().toISOString()
        };
        
        // Use sendBeacon to avoid blocking and ensure data is sent even during page unload
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/error-report', JSON.stringify(errorData));
        } else {
          // Fallback to fetch if sendBeacon is not available
          fetch('/api/error-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errorData),
            // Keep request from blocking page unload
            keepalive: true
          }).catch(e => console.error('Failed to report error:', e));
        }
      } catch (reportError) {
        console.error('Failed to report error to server:', reportError);
      }
    }
  }
  
  /**
   * Reset boundary state to recover from error
   */
  resetErrorBoundary = (): void => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null
    });
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    
    if (hasError && error) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI with dark mode support
      return (
        <div className="error-boundary p-6 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {this.props.componentName 
                  ? `Error in ${this.props.componentName}`
                  : 'Something went wrong'
                }
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                The application encountered an error and couldn't continue. You can try to refresh the page or reset the component.
              </p>
              
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                <details className="text-sm">
                  <summary className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                    Technical details
                  </summary>
                  <div className="mt-2 space-y-2">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400">{error.name}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
                    </div>
                    {errorInfo && (
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Component Stack</h4>
                        <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-40">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                    {error.stack && (
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Stack Trace</h4>
                        <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-40">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              </div>
              
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={this.resetErrorBoundary}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // No error, render children
    return this.props.children;
  }
}

export default ErrorBoundary;
