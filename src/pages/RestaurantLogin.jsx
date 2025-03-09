import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/restaurant-dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-dark dark:text-white">
            Restaurant Owner Login
          </h1>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Restaurant Owner Credentials:</p>
            <div className="mt-2 text-left bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p><strong>Green Bistro:</strong> green_bistro@example.com / GreenBistro123</p>
              <p><strong>Veggie Delight:</strong> veggie_delight@example.com / VeggieDelight123</p>
              <p><strong>Ocean Fresh:</strong> ocean_fresh@example.com / OceanFresh123</p>
              <p><strong>Eco Burger:</strong> eco_burger@example.com / EcoBurger123</p>
              <p><strong>Green Curry House:</strong> green_curry@example.com / GreenCurry123</p>
              <p><strong>Sustainable Sushi:</strong> sustainable_sushi@example.com / SushiGreen123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin; 