import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <div className="mb-8">
          <span className="text-9xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary px-8 py-3">
            Go Home
          </Link>
          <Link to="/restaurants" className="btn bg-white dark:bg-gray-800 text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3">
            Browse Restaurants
          </Link>
        </div>
        
        <div className="mt-12">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-gray-600 dark:text-gray-400">
            While you're here, did you know that using GreenEats has saved over 1,234,567 kg of CO₂ emissions?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 