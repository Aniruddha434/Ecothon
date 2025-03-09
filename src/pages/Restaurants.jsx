import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for restaurants
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
  },
  {
    id: 2,
    name: 'Veggie Delight',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 4.8,
    description: 'Plant-based cuisine that\'s delicious and environmentally friendly.',
    tags: ['Vegan', 'Organic', 'Gluten-Free'],
    ecoFriendly: 'Vegan-Friendly',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.49',
    minOrder: '$12.00',
  },
  {
    id: 3,
    name: 'Ocean Fresh',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 4.7,
    description: 'Sustainable seafood sourced from responsible fisheries.',
    tags: ['Seafood', 'Sustainable', 'Fresh'],
    ecoFriendly: 'Sustainable Seafood',
    deliveryTime: '30-40 min',
    deliveryFee: '$2.99',
    minOrder: '$20.00',
  },
  {
    id: 4,
    name: 'Eco Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 4.5,
    description: 'Plant-based burgers that taste like the real thing but better for the planet.',
    tags: ['Burgers', 'Plant-Based', 'Fast Food'],
    ecoFriendly: 'Plant-Based Options',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.49',
    minOrder: '$10.00',
  },
  {
    id: 5,
    name: 'Green Curry House',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 4.6,
    description: 'Authentic Thai curries made with locally sourced ingredients.',
    tags: ['Thai', 'Spicy', 'Curry'],
    ecoFriendly: 'Local Ingredients',
    deliveryTime: '35-45 min',
    deliveryFee: '$2.99',
    minOrder: '$18.00',
  },
  {
    id: 6,
    name: 'Sustainable Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    rating: 4.9,
    description: 'Sushi made with sustainably sourced fish and plant-based options.',
    tags: ['Sushi', 'Japanese', 'Sustainable'],
    ecoFriendly: 'Sustainable Fish',
    deliveryTime: '25-40 min',
    deliveryFee: '$3.49',
    minOrder: '$25.00',
  },
];

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // All available tags from restaurants
  const allTags = [...new Set(mockRestaurants.flatMap(restaurant => restaurant.tags))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setFilteredRestaurants(mockRestaurants);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter restaurants based on search term and selected tags
    const filtered = restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => restaurant.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedTags, restaurants]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
            Eco-Friendly <span className="text-primary">Restaurants</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Browse our selection of restaurants committed to sustainable practices. 
            All deliveries are made using eco-friendly transportation methods.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants or cuisines..."
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-4">
            <p className="text-sm font-medium text-dark dark:text-white mb-2">Filter by tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurant Listings */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {filteredRestaurants.length} restaurants found
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.map(restaurant => (
                <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-dark dark:text-white">{restaurant.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">{'★'.repeat(Math.floor(restaurant.rating))}</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">{restaurant.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {restaurant.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>{restaurant.deliveryTime}</span>
                      <span>{restaurant.deliveryFee} delivery</span>
                      <span>Min: {restaurant.minOrder}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary font-medium">
                        🌱 {restaurant.ecoFriendly}
                      </span>
                      <Link to={`/restaurants/${restaurant.id}`} className="btn btn-primary text-sm">
                        View Menu
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 text-dark dark:text-white">No restaurants found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants; 