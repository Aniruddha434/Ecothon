import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Green Street, Eco City, EC 12345',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  carbonSaved: 12.5,
  points: 350,
  level: 'Eco Warrior',
};

// Mock order history
const mockOrders = [
  {
    id: 'ORD-123456',
    date: '2023-06-15T14:30:00Z',
    restaurant: {
      id: 1,
      name: 'Green Bistro',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    },
    items: [
      { id: 101, name: 'Organic Garden Salad', price: 8.99, quantity: 1 },
      { id: 104, name: 'Vegetable Risotto', price: 14.99, quantity: 2 },
    ],
    total: 38.97,
    status: 'delivered',
    deliveryMethod: 'bike',
    co2Saved: 0.5,
  },
  {
    id: 'ORD-789012',
    date: '2023-06-10T12:15:00Z',
    restaurant: {
      id: 2,
      name: 'Veggie Delight',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    },
    items: [
      { id: 201, name: 'Vegan Buddha Bowl', price: 12.99, quantity: 1 },
      { id: 202, name: 'Avocado Toast', price: 9.99, quantity: 1 },
      { id: 203, name: 'Green Smoothie', price: 5.99, quantity: 2 },
    ],
    total: 34.96,
    status: 'delivered',
    deliveryMethod: 'drone',
    co2Saved: 0.7,
  },
  {
    id: 'ORD-345678',
    date: '2023-06-05T19:45:00Z',
    restaurant: {
      id: 3,
      name: 'Ocean Fresh',
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    },
    items: [
      { id: 301, name: 'Sustainable Seafood Platter', price: 24.99, quantity: 1 },
      { id: 302, name: 'Seaweed Salad', price: 7.99, quantity: 1 },
    ],
    total: 32.98,
    status: 'delivered',
    deliveryMethod: 'ev',
    co2Saved: 0.3,
  },
];

// Dashboard Profile Component
const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">My Profile</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">{user.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{user.level}</p>
          
          {/* Eco Stats */}
          <div className="bg-primary/10 rounded-lg p-4 w-full">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">CO₂ Saved:</span>
              <span className="font-semibold text-primary">{user.carbonSaved} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Eco Points:</span>
              <span className="font-semibold text-primary">{user.points}</span>
            </div>
          </div>
        </div>
        
        {/* Profile Form */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
              />
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="address" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Dashboard Orders Component
const Orders = ({ orders }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Order History</h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-dark dark:text-white">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {order.status === 'delivered' ? 'Delivered' : 'In Progress'}
                  </span>
                  <Link 
                    to={`/order-tracking/${order.id}`}
                    className="ml-4 text-primary hover:text-primary/80 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              {/* Order Content */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img 
                    src={order.restaurant.image} 
                    alt={order.restaurant.name} 
                    className="w-12 h-12 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      {order.restaurant.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="mr-2">
                        {order.deliveryMethod === 'bike' && '🚲 E-Bike'}
                        {order.deliveryMethod === 'ev' && '🚚 EV Van'}
                        {order.deliveryMethod === 'drone' && '🚁 Drone'}
                      </span>
                      <span className="text-primary">
                        {order.co2Saved} kg CO₂ saved
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-dark dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Order Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                  <span className="font-medium text-dark dark:text-white">Total</span>
                  <span className="font-medium text-dark dark:text-white">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Dashboard EcoImpact Component
const EcoImpact = ({ user, orders }) => {
  // Calculate total CO2 savings
  const totalCO2Saved = orders.reduce((total, order) => total + order.co2Saved, 0);
  
  // Calculate equivalent metrics
  const treesSaved = (totalCO2Saved * 0.1).toFixed(1);
  const carMilesSaved = (totalCO2Saved * 2.5).toFixed(1);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Your Eco Impact</h2>
      
      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary/10 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🌱</div>
          <p className="text-2xl font-bold text-primary mb-1">{totalCO2Saved.toFixed(1)} kg</p>
          <p className="text-gray-600 dark:text-gray-400">CO₂ Emissions Saved</p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🌳</div>
          <p className="text-2xl font-bold text-primary mb-1">{treesSaved}</p>
          <p className="text-gray-600 dark:text-gray-400">Equivalent Trees Planted</p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🚗</div>
          <p className="text-2xl font-bold text-primary mb-1">{carMilesSaved} miles</p>
          <p className="text-gray-600 dark:text-gray-400">Car Travel Avoided</p>
        </div>
      </div>
      
      {/* Eco Level */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-1">
              Your Eco Level: {user.level}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user.points} points earned through eco-friendly deliveries
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${Math.min((user.points / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-600 dark:text-gray-400">0</span>
              <span className="text-gray-600 dark:text-gray-400">500</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips */}
      <div>
        <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
          Tips to Increase Your Impact
        </h3>
        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Choose drone delivery for the highest CO₂ savings per order.
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Order from restaurants that use locally sourced ingredients.
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Combine multiple items in a single order to reduce delivery trips.
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Refer friends to GreenEats and earn eco points for each referral.
          </li>
        </ul>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set active tab based on URL
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'dashboard' || path === '') {
      setActiveTab('profile');
    } else {
      setActiveTab(path);
    }
  }, [location]);
  
  // Simulate fetching user data and orders
  useEffect(() => {
    setTimeout(() => {
      setUser(mockUser);
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab === 'profile' ? '' : tab}`);
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-white">
          My Dashboard
        </h1>
        
        {/* Dashboard Tabs */}
        <div className="flex overflow-x-auto mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleTabChange('profile')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabChange('orders')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => handleTabChange('eco-impact')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'eco-impact'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Eco Impact
          </button>
        </div>
        
        {/* Dashboard Content */}
        <div>
          {activeTab === 'profile' && <Profile user={user} />}
          {activeTab === 'orders' && <Orders orders={orders} />}
          {activeTab === 'eco-impact' && <EcoImpact user={user} orders={orders} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 