import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Revelate Operations',
  description: 'The page you are looking for cannot be found.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight md:text-9xl">
          404
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Please check the URL or navigate back to our homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-semibold transition"
          >
            Back to Home
          </Link>
          <Link 
            href="/contact" 
            className="btn border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-md font-semibold transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
