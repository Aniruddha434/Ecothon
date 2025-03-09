import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock order data
const mockOrder = {
  id: '12345',
  restaurant: {
    id: 1,
    name: 'Green Bistro',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '123 Green Street, Eco City',
  },
  customer: {
    name: 'John Doe',
    address: '456 Sustainable Ave, Eco City',
    phone: '+1 (555) 123-4567',
  },
  items: [
    { id: 101, name: 'Organic Garden Salad', price: 8.99, quantity: 1 },
    { id: 104, name: 'Vegetable Risotto', price: 14.99, quantity: 2 },
    { id: 108, name: 'Chocolate Avocado Mousse', price: 7.99, quantity: 1 },
  ],
  deliveryMethod: 'drone',
  deliveryPerson: {
    name: 'Drone #D-42',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  status: 'in-transit', // 'preparing', 'ready', 'in-transit', 'delivered'
  estimatedDeliveryTime: '15-20 min',
  orderTime: '2023-06-15T14:30:00Z',
  deliveryFee: 2.99,
  subtotal: 46.96,
  total: 49.95,
  co2Saved: 0.7,
};

// Mock tracking coordinates
const mockTrackingPath = [
  { lat: 37.7749, lng: -122.4194 }, // Starting point (restaurant)
  { lat: 37.7755, lng: -122.4180 },
  { lat: 37.7761, lng: -122.4166 },
  { lat: 37.7768, lng: -122.4152 },
  { lat: 37.7775, lng: -122.4138 },
  { lat: 37.7782, lng: -122.4124 },
  { lat: 37.7789, lng: -122.4110 },
  { lat: 37.7796, lng: -122.4096 }, // Destination (customer)
];

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate API call to get order details
    setTimeout(() => {
      setOrder(mockOrder);
      setCurrentCoordinates(mockTrackingPath[0]);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!order || order.status !== 'in-transit') return;

    // Simulate movement along the path
    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        if (prev < mockTrackingPath.length - 1) {
          setCurrentCoordinates(mockTrackingPath[prev + 1]);
          setProgress(((prev + 1) / (mockTrackingPath.length - 1)) * 100);
          return prev + 1;
        } else {
          clearInterval(interval);
          // Update order status to delivered when reached destination
          setOrder(prev => ({ ...prev, status: 'delivered' }));
          return prev;
        }
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [order]);

  const getStatusText = (status) => {
    switch(status) {
      case 'preparing':
        return 'Preparing your order';
      case 'ready':
        return 'Order ready for pickup';
      case 'in-transit':
        return 'Order on the way';
      case 'delivered':
        return 'Order delivered';
      default:
        return 'Processing order';
    }
  };

  const getStatusStep = (status) => {
    switch(status) {
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'in-transit':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-white">Order not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/restaurants" className="btn btn-primary">
            Order Food
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
            Track Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Order #{order.id} • Placed on {new Date(order.orderTime).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Status and Map */}
          <div className="lg:col-span-2">
            {/* Order Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">
                {getStatusText(order.status)}
              </h2>
              
              {/* Status Timeline */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>
                <div 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary transition-all duration-500"
                  style={{ width: `${getStatusStep(order.status) * 33.33}%` }}
                ></div>
                
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      getStatusStep(order.status) >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      1
                    </div>
                    <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">Preparing</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      getStatusStep(order.status) >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      2
                    </div>
                    <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">Ready</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      getStatusStep(order.status) >= 3 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      3
                    </div>
                    <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">On the way</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      getStatusStep(order.status) >= 4 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      4
                    </div>
                    <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">Delivered</span>
                  </div>
                </div>
              </div>
              
              {/* Estimated Time */}
              {order.status !== 'delivered' && (
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">Estimated delivery time</p>
                  <p className="text-2xl font-bold text-dark dark:text-white">{order.estimatedDeliveryTime}</p>
                </div>
              )}
              
              {order.status === 'delivered' && (
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">Delivered at</p>
                  <p className="text-2xl font-bold text-dark dark:text-white">
                    {new Date(new Date(order.orderTime).getTime() + 25 * 60000).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
            
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Live Tracking</h2>
              
              {/* Map Placeholder - In a real app, this would be a Google Maps component */}
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-80">
                {/* This is a placeholder for the map. In a real app, you would use Google Maps API */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Google Maps would be integrated here in a production app
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 dark:bg-gray-600">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Coordinates Display (for demonstration) */}
                {currentCoordinates && (
                  <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs">
                    <p className="text-gray-600 dark:text-gray-400">
                      Lat: {currentCoordinates.lat.toFixed(4)}, Lng: {currentCoordinates.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Delivery Info */}
              {order.status === 'in-transit' && (
                <div className="mt-4 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={order.deliveryPerson.image} 
                      alt={order.deliveryPerson.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">{order.deliveryPerson.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm mr-1">★</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{order.deliveryPerson.rating}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {order.deliveryMethod === 'bike' && '🚲 E-Bike'}
                      {order.deliveryMethod === 'ev' && '🚚 EV Van'}
                      {order.deliveryMethod === 'drone' && '🚁 Drone'}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* CO2 Savings */}
            <div className="bg-primary/10 rounded-lg p-6">
              <div className="flex items-center">
                <div className="mr-4 text-4xl">🌱</div>
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-1">
                    Your Eco-Impact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    By choosing {order.deliveryMethod === 'bike' ? 'E-Bike' : order.deliveryMethod === 'ev' ? 'EV Van' : 'Drone'} delivery, 
                    you've saved <span className="font-semibold text-primary">{order.co2Saved} kg</span> of CO₂ emissions.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    That's equivalent to planting {(order.co2Saved * 0.1).toFixed(1)} trees! 🌳
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Details */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Order Details</h2>
              
              {/* Restaurant Info */}
              <div className="flex items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <img 
                  src={order.restaurant.image} 
                  alt={order.restaurant.name} 
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">{order.restaurant.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.restaurant.address}</p>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 text-dark dark:text-white">Items</h3>
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="text-dark dark:text-white">
                          {item.quantity}x {item.name}
                        </p>
                      </div>
                      <p className="text-dark dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Delivery Address */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 text-dark dark:text-white">Delivery Address</h3>
                <p className="text-gray-600 dark:text-gray-400">{order.customer.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{order.customer.address}</p>
                <p className="text-gray-600 dark:text-gray-400">{order.customer.phone}</p>
              </div>
              
              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold mb-3 text-dark dark:text-white">Payment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-dark dark:text-white">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="text-dark dark:text-white">${order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-dark dark:text-white">Total</span>
                    <span className="text-dark dark:text-white">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Help Button */}
            <div className="text-center">
              <button className="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 w-full">
                Need Help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 