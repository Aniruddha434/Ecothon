import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Restaurant credentials
const restaurantCredentials = {
  'green_bistro@example.com': {
    password: 'GreenBistro123',
    restaurantId: 1,
    name: 'Green Bistro',
    role: 'restaurant_owner'
  },
  'veggie_delight@example.com': {
    password: 'VeggieDelight123',
    restaurantId: 2,
    name: 'Veggie Delight',
    role: 'restaurant_owner'
  },
  'ocean_fresh@example.com': {
    password: 'OceanFresh123',
    restaurantId: 3,
    name: 'Ocean Fresh',
    role: 'restaurant_owner'
  },
  'eco_burger@example.com': {
    password: 'EcoBurger123',
    restaurantId: 4,
    name: 'Eco Burger',
    role: 'restaurant_owner'
  },
  'green_curry@example.com': {
    password: 'GreenCurry123',
    restaurantId: 5,
    name: 'Green Curry House',
    role: 'restaurant_owner'
  },
  'sustainable_sushi@example.com': {
    password: 'SushiGreen123',
    restaurantId: 6,
    name: 'Sustainable Sushi',
    role: 'restaurant_owner'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    // First check if it's a restaurant owner
    const restaurantUser = restaurantCredentials[email];
    if (restaurantUser && restaurantUser.password === password) {
      const userData = {
        email,
        name: restaurantUser.name,
        role: restaurantUser.role,
        restaurantId: restaurantUser.restaurantId
      };
      
      // Create a simple token for restaurant owners
      const token = btoa(JSON.stringify({
        userId: email,
        role: userData.role,
        restaurantId: userData.restaurantId,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
      }));
      
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }

    // If not a restaurant owner, try regular login
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isRestaurantOwner = () => {
    return user?.role === 'restaurant_owner';
  };

  const getRestaurantId = () => {
    return user?.restaurantId;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      isRestaurantOwner, 
      getRestaurantId 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 