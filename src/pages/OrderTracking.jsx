import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrderTracking = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Helper function to get status step number
  const getStatusStep = (status) => {
    const steps = {
      'new': 0,
      'preparing': 1,
      'ready': 2,
      'out-for-delivery': 3,
      'delivered': 4
    };
    return steps[status] || 0;
  };

  // Helper function to get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'new':
        return 'Order Received';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Order Ready for Delivery';
      case 'out-for-delivery':
        return 'Order Out for Delivery';
      case 'delivered':
        return 'Order Delivered';
      default:
        return 'Order Status Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-white">Order not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error || "The order you're looking for doesn't exist or has been removed."}
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
            Order #{order._id} • Placed on {new Date(order.orderTime).toLocaleString()}
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Delivery Location</h2>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  {/* Map will be implemented here */}
                  <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    Map View Coming Soon
                  </div>
                </div>
              </div>
              
              {/* Delivery Person Info */}
              {order.status === 'out-for-delivery' && (
                <div className="mt-4 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 dark:bg-gray-700">
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      🚚
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Your Delivery Partner</p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">On the way with your order</span>
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
            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <div className="flex items-center">
                <div className="mr-4 text-4xl">🌱</div>
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-1">
                    Your Eco-Impact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    By choosing {order.deliveryMethod === 'bike' ? 'E-Bike' : order.deliveryMethod === 'ev' ? 'EV Van' : 'Drone'} delivery, 
                    you've saved <span className="font-semibold text-primary">{order.co2Saved.toFixed(2)} kg</span> of CO₂ emissions.
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
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">Restaurant #{order.restaurantId}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}
                  </p>
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
                <p className="text-gray-600 dark:text-gray-400">{user?.name}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.deliveryAddress.street}<br />
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
              </div>
              
              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold mb-3 text-dark dark:text-white">Payment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-dark dark:text-white">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-dark dark:text-white">Total</span>
                    <span className="text-dark dark:text-white">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                    <span className="text-dark dark:text-white capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Status</span>
                    <span className={`capitalize ${
                      order.paymentStatus === 'paid' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {order.paymentStatus}
                    </span>
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