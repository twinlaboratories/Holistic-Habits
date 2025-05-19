import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-accent mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-accent mb-4">Page Not Found</h2>
        
        <p className="text-accent-light mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link href="/" className="btn-primary inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
} 