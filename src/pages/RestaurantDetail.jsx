import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Mock data for restaurants (same as in Restaurants.jsx)
const mockRestaurants = [
  {
    id: 1,
    name: 'Green Bistro',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 5.0,
    description: 'Farm-to-table organic cuisine with sustainable practices.',
    tags: ['Organic', 'Local', 'Vegetarian'],
    ecoFriendly: '100% Eco-Friendly',
    deliveryTime: '25-35 min',
    deliveryFee: '$1.99',
    minOrder: '$15.00',
    menu: [
      {
        category: 'Starters',
        items: [
          { id: 101, name: 'Organic Garden Salad', price: 8.99, description: 'Fresh organic greens with seasonal vegetables and house dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: true, isGlutenFree: true },
          { id: 102, name: 'Seasonal Soup', price: 6.99, description: 'Soup made with seasonal vegetables from local farms.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: true, isGlutenFree: false },
          { id: 103, name: 'Bruschetta', price: 7.99, description: 'Toasted organic bread topped with tomatoes, basil, and olive oil.', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: false, isGlutenFree: false }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: 104, name: 'Vegetable Risotto', price: 14.99, description: 'Creamy risotto with seasonal vegetables and parmesan cheese.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: false, isGlutenFree: true },
          { id: 105, name: 'Quinoa Bowl', price: 13.99, description: 'Organic quinoa with roasted vegetables, avocado, and tahini dressing.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: true, isGlutenFree: true },
          { id: 106, name: 'Eggplant Parmesan', price: 15.99, description: 'Layers of organic eggplant, tomato sauce, and cheese, baked to perfection.', image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: false, isGlutenFree: false }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: 107, name: 'Fruit Tart', price: 6.99, description: 'Seasonal fruits on a pastry crust with organic honey glaze.', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: false, isGlutenFree: false },
          { id: 108, name: 'Chocolate Avocado Mousse', price: 7.99, description: 'Rich chocolate mousse made with ripe avocados and fair-trade cocoa.', image: 'https://images.unsplash.com/photo-1511715112108-9acc5d3e824c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', isVegetarian: true, isVegan: true, isGlutenFree: true }
        ]
      }
    ]
  },
  // Add more restaurants with their menus as needed
];

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('bike');
  const [co2Savings, setCo2Savings] = useState(0);

  useEffect(() => {
    // Simulate API call to get restaurant details
    setTimeout(() => {
      const foundRestaurant = mockRestaurants.find(r => r.id === parseInt(id));
      setRestaurant(foundRestaurant);
      if (foundRestaurant && foundRestaurant.menu && foundRestaurant.menu.length > 0) {
        setActiveCategory(foundRestaurant.menu[0].category);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    // Calculate CO2 savings based on delivery method
    let savings = 0;
    
    switch(selectedDeliveryMethod) {
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
    
    setCo2Savings(savings);
  }, [selectedDeliveryMethod]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 } 
          : cartItem
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Save cart data to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cart));
      localStorage.setItem('selectedDeliveryMethod', selectedDeliveryMethod);
      localStorage.setItem('restaurantInfo', JSON.stringify({
        id: restaurant.id,
        name: restaurant.name,
        deliveryFee: restaurant.deliveryFee
      }));
      
      // Navigate to checkout page
      navigate('/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-white">Restaurant not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The restaurant you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Restaurant Header */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">{'★'.repeat(Math.floor(restaurant.rating))}</span>
              <span className="text-white">{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/20 text-white rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="flex-grow">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Menu</h2>
              
              {/* Category Navigation */}
              <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
                {restaurant.menu.map(category => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeCategory === category.category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
              
              {/* Menu Items */}
              {restaurant.menu
                .filter(category => category.category === activeCategory)
                .map(category => (
                  <div key={category.category}>
                    <h3 className="text-xl font-semibold mb-4 text-dark dark:text-white">{category.category}</h3>
                    <div className="space-y-6">
                      {category.items.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full md:w-32 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-lg font-semibold text-dark dark:text-white">{item.name}</h4>
                              <span className="font-semibold text-dark dark:text-white">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                {item.isVegetarian && (
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                                    Vegetarian
                                  </span>
                                )}
                                {item.isVegan && (
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                                    Vegan
                                  </span>
                                )}
                                {item.isGlutenFree && (
                                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">
                                    Gluten-Free
                                  </span>
                                )}
                              </div>
                              <button 
                                onClick={() => addToCart(item)}
                                className="btn btn-primary text-sm"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Your Order</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your cart is empty. Add items from the menu to get started.
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-dark dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-dark dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-dark dark:text-white">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                      <span className="text-dark dark:text-white">{restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-dark dark:text-white">Total</span>
                      <span className="text-dark dark:text-white">${(calculateTotal() + parseFloat(restaurant.deliveryFee.replace('$', ''))).toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
              
              {/* Delivery Method Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-dark dark:text-white">Choose Delivery Method</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setSelectedDeliveryMethod('bike')}
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      selectedDeliveryMethod === 'bike'
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚲</span>
                    <span className="text-xs text-dark dark:text-white">E-Bike</span>
                  </button>
                  <button 
                    onClick={() => setSelectedDeliveryMethod('ev')}
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      selectedDeliveryMethod === 'ev'
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚚</span>
                    <span className="text-xs text-dark dark:text-white">EV Van</span>
                  </button>
                  <button 
                    onClick={() => setSelectedDeliveryMethod('drone')}
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      selectedDeliveryMethod === 'drone'
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚁</span>
                    <span className="text-xs text-dark dark:text-white">Drone</span>
                  </button>
                </div>
                
                {/* CO2 Savings */}
                <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-dark dark:text-white">
                    <span className="font-semibold">CO₂ Savings:</span> {co2Savings} kg
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    That's equivalent to planting {(co2Savings * 0.1).toFixed(1)} trees! 🌳
                  </p>
                </div>
              </div>
              
              <button 
                className={`w-full btn btn-primary py-3 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={cart.length === 0}
                onClick={() => {
                  if (cart.length > 0) {
                    // Save cart data to localStorage
                    localStorage.setItem('cartItems', JSON.stringify(cart));
                    localStorage.setItem('selectedDeliveryMethod', selectedDeliveryMethod);
                    localStorage.setItem('restaurantInfo', JSON.stringify({
                      id: restaurant.id,
                      name: restaurant.name,
                      deliveryFee: restaurant.deliveryFee
                    }));
                    
                    // Navigate to checkout page
                    navigate('/checkout');
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail; 