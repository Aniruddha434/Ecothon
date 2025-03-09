import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantAnalytics from '../components/RestaurantAnalytics';
import { useAuth } from '../context/AuthContext';
import MenuManagement from '../components/MenuManagement';

// Mock data for restaurants
const mockRestaurants = {
  1: {
  id: 1,
  name: 'Green Bistro',
  image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  address: '123 Green Street, Eco City',
  phone: '+1 (555) 123-4567',
  email: 'info@greenbistro.com',
  rating: 4.8,
  totalOrders: 1245,
  totalRevenue: 28750.50,
  co2Saved: 325.5,
  },
  2: {
    id: 2,
    name: 'Veggie Delight',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '456 Veg Lane, Eco City',
    phone: '+1 (555) 234-5678',
    email: 'info@veggiedelight.com',
    rating: 4.7,
    totalOrders: 980,
    totalRevenue: 22450.75,
    co2Saved: 275.2,
  },
  3: {
    id: 3,
    name: 'Ocean Fresh',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '789 Ocean Drive, Eco City',
    phone: '+1 (555) 345-6789',
    email: 'info@oceanfresh.com',
    rating: 4.6,
    totalOrders: 850,
    totalRevenue: 24680.30,
    co2Saved: 245.8,
  },
  4: {
    id: 4,
    name: 'Eco Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '321 Burger Street, Eco City',
    phone: '+1 (555) 456-7890',
    email: 'info@ecoburger.com',
    rating: 4.5,
    totalOrders: 1120,
    totalRevenue: 19875.60,
    co2Saved: 298.4,
  },
  5: {
    id: 5,
    name: 'Green Curry House',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '567 Curry Lane, Eco City',
    phone: '+1 (555) 567-8901',
    email: 'info@greencurry.com',
    rating: 4.7,
    totalOrders: 930,
    totalRevenue: 21340.80,
    co2Saved: 265.9,
  },
  6: {
    id: 6,
    name: 'Sustainable Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    address: '890 Sushi Way, Eco City',
    phone: '+1 (555) 678-9012',
    email: 'info@sustainablesushi.com',
    rating: 4.8,
    totalOrders: 875,
    totalRevenue: 26540.90,
    co2Saved: 285.3,
  }
};

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-789012',
    customer: {
      name: 'John Doe',
      address: '456 Sustainable Ave, Eco City',
      phone: '+1 (555) 987-6543',
    },
    items: [
      { id: 101, name: 'Organic Garden Salad', price: 8.99, quantity: 1 },
      { id: 104, name: 'Vegetable Risotto', price: 14.99, quantity: 2 },
    ],
    total: 38.97,
    status: 'new', // 'new', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'
    orderTime: '2023-06-15T14:30:00Z',
    deliveryMethod: 'bike',
    estimatedDeliveryTime: '25-35 min',
    paymentMethod: 'card',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-789013',
    customer: {
      name: 'Jane Smith',
      address: '789 Eco Lane, Eco City',
      phone: '+1 (555) 456-7890',
    },
    items: [
      { id: 102, name: 'Seasonal Soup', price: 6.99, quantity: 1 },
      { id: 105, name: 'Quinoa Bowl', price: 13.99, quantity: 1 },
      { id: 108, name: 'Chocolate Avocado Mousse', price: 7.99, quantity: 2 },
    ],
    total: 36.96,
    status: 'preparing',
    orderTime: '2023-06-15T14:15:00Z',
    deliveryMethod: 'drone',
    estimatedDeliveryTime: '15-20 min',
    paymentMethod: 'card',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-789014',
    customer: {
      name: 'Robert Johnson',
      address: '101 Green Building, Eco City',
      phone: '+1 (555) 234-5678',
    },
    items: [
      { id: 103, name: 'Bruschetta', price: 7.99, quantity: 2 },
      { id: 106, name: 'Eggplant Parmesan', price: 15.99, quantity: 1 },
    ],
    total: 31.97,
    status: 'ready',
    orderTime: '2023-06-15T13:45:00Z',
    deliveryMethod: 'ev',
    estimatedDeliveryTime: '30-40 min',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
  },
  {
    id: 'ORD-789015',
    customer: {
      name: 'Emily Davis',
      address: '222 Sustainable Heights, Eco City',
      phone: '+1 (555) 345-6789',
    },
    items: [
      { id: 107, name: 'Fruit Tart', price: 6.99, quantity: 3 },
    ],
    total: 20.97,
    status: 'out-for-delivery',
    orderTime: '2023-06-15T13:30:00Z',
    deliveryMethod: 'bike',
    estimatedDeliveryTime: '25-35 min',
    paymentMethod: 'card',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-789016',
    customer: {
      name: 'Michael Brown',
      address: '333 Eco Apartments, Eco City',
      phone: '+1 (555) 456-7890',
    },
    items: [
      { id: 101, name: 'Organic Garden Salad', price: 8.99, quantity: 2 },
      { id: 108, name: 'Chocolate Avocado Mousse', price: 7.99, quantity: 2 },
    ],
    total: 33.96,
    status: 'delivered',
    orderTime: '2023-06-15T12:30:00Z',
    deliveryMethod: 'drone',
    estimatedDeliveryTime: '15-20 min',
    paymentMethod: 'card',
    paymentStatus: 'paid',
  },
];

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const { user, isRestaurantOwner, getRestaurantId } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardView, setDashboardView] = useState('orders'); // 'orders' or 'analytics'

  useEffect(() => {
    // Check if user is logged in and is a restaurant owner
    if (!isRestaurantOwner()) {
      navigate('/restaurant-login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/orders/restaurant', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Get the restaurant data based on the user's restaurant ID
    const restaurantId = getRestaurantId();
    const restaurantData = mockRestaurants[restaurantId];
    setRestaurant(restaurantData);

    // Fetch orders
    fetchOrders();

    // Set up polling to check for new orders every 30 seconds
    const pollInterval = setInterval(fetchOrders, 30000);

    return () => clearInterval(pollInterval);
  }, [navigate, isRestaurantOwner, getRestaurantId]);

  // Filter orders based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === activeTab));
    }
  }, [activeTab, orders]);

  // Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Update the order in the local state
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders.filter(order => 
        activeTab === 'all' || order.status === activeTab
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // View order details
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close order details
  const closeOrderDetails = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'out-for-delivery':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get delivery method icon
  const getDeliveryMethodIcon = (method) => {
    switch(method) {
      case 'bike':
        return '🚲';
      case 'ev':
        return '🚚';
      case 'drone':
        return '🚁';
      default:
        return '📦';
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            {user?.name} Dashboard
          </h1>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Active Orders: {orders.filter(order => order.status !== 'completed').length}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img 
              src={restaurant?.image} 
              alt={restaurant?.name} 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {restaurant?.name} Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {restaurant?.address} • {restaurant?.phone}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{restaurant?.totalOrders}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${restaurant?.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{restaurant?.co2Saved} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setDashboardView('orders')}
            className={`py-3 px-6 font-medium text-sm ${
              dashboardView === 'orders'
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            Orders Management
          </button>
          <button
            onClick={() => setDashboardView('analytics')}
            className={`py-3 px-6 font-medium text-sm ${
              dashboardView === 'analytics'
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            Analytics & Insights
          </button>
        </div>

        {/* Dashboard Content */}
        {dashboardView === 'orders' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Order Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'new'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                New Orders
              </button>
              <button
                onClick={() => setActiveTab('preparing')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'preparing'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Preparing
              </button>
              <button
                onClick={() => setActiveTab('ready')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'ready'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Ready
              </button>
              <button
                onClick={() => setActiveTab('out-for-delivery')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'out-for-delivery'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Out for Delivery
              </button>
              <button
                onClick={() => setActiveTab('delivered')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'delivered'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'cancelled'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Cancelled
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                All Orders
              </button>
            </div>

            {/* Orders List */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {activeTab === 'all' ? 'All Orders' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders`}
              </h2>
              
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">No orders found in this category.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map(order => (
                    <div 
                      key={order.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white mr-3">
                                Order #{order.id}
                              </h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(order.orderTime)} • {order.customerName} • {order.customer.phone}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                              {getDeliveryMethodIcon(order.deliveryMethod)} {order.deliveryMethod.toUpperCase()} • {order.estimatedDeliveryTime}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {order.items.map(item => (
                            <span key={item.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {item.quantity}x {item.name}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openOrderDetails(order)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                          >
                            View Details
                          </button>
                          
                          {order.status === 'new' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'preparing')}
                              className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md text-sm"
                            >
                              Accept & Prepare
                            </button>
                          )}
                          
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'ready')}
                              className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md text-sm"
                            >
                              Mark as Ready
                            </button>
                          )}
                          
                          {order.status === 'ready' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'out-for-delivery')}
                              className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md text-sm"
                            >
                              Send for Delivery
                            </button>
                          )}
                          
                          {(order.status === 'new' || order.status === 'preparing') && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md text-sm"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <RestaurantAnalytics />
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order Details - #{selectedOrder.id}
                </h2>
                <button
                  onClick={closeOrderDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Order Time:</span>
                  <span className="text-gray-900 dark:text-white">{formatDate(selectedOrder.orderTime)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Delivery Method:</span>
                  <span className="text-gray-900 dark:text-white">
                    {getDeliveryMethodIcon(selectedOrder.deliveryMethod)} {selectedOrder.deliveryMethod.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                  <span className="text-gray-900 dark:text-white">{selectedOrder.estimatedDeliveryTime}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                  <span className="text-gray-900 dark:text-white">{selectedOrder.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                  <span className={`${
                    selectedOrder.paymentStatus === 'paid' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {selectedOrder.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customer Information</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{selectedOrder.customerName}</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedOrder.customer.address}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedOrder.status === 'new' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'preparing');
                      closeOrderDetails();
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
                  >
                    Accept & Prepare
                  </button>
                )}
                
                {selectedOrder.status === 'preparing' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'ready');
                      closeOrderDetails();
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
                  >
                    Mark as Ready
                  </button>
                )}
                
                {selectedOrder.status === 'ready' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'out-for-delivery');
                      closeOrderDetails();
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
                  >
                    Send for Delivery
                  </button>
                )}
                
                {(selectedOrder.status === 'new' || selectedOrder.status === 'preparing') && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'cancelled');
                      closeOrderDetails();
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Cancel Order
                  </button>
                )}
                
                <button
                  onClick={closeOrderDetails}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard; 