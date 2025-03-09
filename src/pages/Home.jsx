import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [savedCO2, setSavedCO2] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Set visibility after component mounts for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate CO2 savings based on delivery method
  const calculateCO2Savings = (method) => {
    let savings = 0;
    
    switch(method) {
      case 'bike':
        savings = 0.5; // kg of CO2 saved compared to traditional delivery
        break;
      case 'ev':
        savings = 0.3;
        break;
      case 'drone':
        savings = 0.7;
        break;
      default:
        savings = 0;
    }
    
    setSavedCO2(savings);
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay and Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-10000 ease-linear"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
            animation: "slowZoom 30s infinite alternate"
          }}
        >
          <div className="absolute inset-0 bg-dark/70"></div>
        </div>
        
        {/* Animated Eco Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating leaves */}
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
          <div className="leaf leaf-4"></div>
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-pulse opacity-30"></div>
          
          {/* Animated delivery vehicles */}
          <div className="delivery-vehicle bike">🚲</div>
          <div className="delivery-vehicle ev">🚚</div>
          <div className="delivery-vehicle drone">🚁</div>
          
          {/* Floating food container */}
          <div className="food-container">
            <div className="food-emoji">🥗</div>
            <div className="food-emoji">🍔</div>
            <div className="food-emoji">🍕</div>
            <div className="food-emoji">🍱</div>
            <div className="food-emoji">🥤</div>
            <div className="glow-effect"></div>
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
              <span className="inline-block animate-float-slow">Eco</span>
              <span className="inline-block">-</span>
              <span className="inline-block animate-float-slower">Friendly</span>
              <span className="block text-primary animate-pulse-slow">Food Delivery</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Delicious food delivered to your doorstep with zero guilt. 
              Choose sustainable delivery options and reduce your carbon footprint.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link to="/restaurants" className="btn btn-primary text-lg px-8 py-3 hover:scale-105 transition-transform">
              Order Now
            </Link>
            <a href="#how-it-works" className="btn bg-white text-dark hover:bg-gray-100 text-lg px-8 py-3 hover:scale-105 transition-transform">
              Learn More
            </a>
          </div>
          
          {/* Animated scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* CO2 Calculator Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-white">
              Calculate Your <span className="text-primary">CO₂ Savings</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Choose your preferred eco-friendly delivery method and see how much CO₂ you can save compared to traditional delivery.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <button 
                onClick={() => calculateCO2Savings('bike')}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">🚲</div>
                <h3 className="text-xl font-semibold mb-2 text-dark dark:text-white">Electric Bicycle</h3>
                <p className="text-gray-600 dark:text-gray-400">Perfect for short distances and quick deliveries.</p>
              </button>
              
              <button 
                onClick={() => calculateCO2Savings('ev')}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-2 text-dark dark:text-white">EV Delivery Van</h3>
                <p className="text-gray-600 dark:text-gray-400">Ideal for multiple orders and larger deliveries.</p>
              </button>
              
              <button 
                onClick={() => calculateCO2Savings('drone')}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">🚁</div>
                <h3 className="text-xl font-semibold mb-2 text-dark dark:text-white">Drone Delivery</h3>
                <p className="text-gray-600 dark:text-gray-400">Fast delivery for remote areas with zero emissions.</p>
              </button>
            </div>
            
            {savedCO2 > 0 && (
              <div className="bg-primary/10 p-6 rounded-lg animate-fadeIn">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  You saved {savedCO2} kg of CO₂!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  That's equivalent to planting {(savedCO2 * 0.1).toFixed(1)} trees! 🌳
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark dark:text-white">
            How <span className="text-primary">GreenEats</span> Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark dark:text-white">Choose a Restaurant</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our curated selection of eco-conscious restaurants and their delicious menus.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark dark:text-white">Select Delivery Method</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose between electric bikes, EV vans, or drone delivery based on your location and needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark dark:text-white">Track & Enjoy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your order in real-time and see your carbon footprint savings with each delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark dark:text-white">
            Featured <span className="text-primary">Restaurants</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Restaurant Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
                alt="Green Bistro" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-dark dark:text-white">Green Bistro</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Farm-to-table organic cuisine with sustainable practices.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary font-medium">
                    🌱 100% Eco-Friendly
                  </span>
                  <Link to="/restaurants/1" className="text-primary hover:underline">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Restaurant Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
                alt="Veggie Delight" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-dark dark:text-white">Veggie Delight</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Plant-based cuisine that's delicious and environmentally friendly.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary font-medium">
                    🌱 Vegan-Friendly
                  </span>
                  <Link to="/restaurants/2" className="text-primary hover:underline">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Restaurant Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
                alt="Ocean Fresh" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-dark dark:text-white">Ocean Fresh</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">4.7</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Sustainable seafood sourced from responsible fisheries.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary font-medium">
                    🌊 Sustainable Seafood
                  </span>
                  <Link to="/restaurants/3" className="text-primary hover:underline">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/restaurants" className="btn btn-primary px-8 py-3">
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark dark:text-white">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">Sarah Johnson</h3>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "I love that I can enjoy my favorite foods while knowing my delivery is eco-friendly. The drone delivery was super fast and fun to watch!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">Michael Chen</h3>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "The carbon footprint tracker is amazing! I've saved over 10kg of CO2 in just a month of ordering through GreenEats. Highly recommend!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">Emily Rodriguez</h3>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "As a restaurant owner, partnering with GreenEats has helped us reach more eco-conscious customers and reduce our environmental impact."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Order Sustainable Food?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of eco-conscious food lovers making a difference with every meal.
          </p>
          <Link to="/restaurants" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 