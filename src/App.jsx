import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import Dashboard from './pages/Dashboard'
import RestaurantDashboard from './pages/RestaurantDashboard'
import EnvironmentalImpact from './pages/EnvironmentalImpact'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import RestaurantLogin from './pages/RestaurantLogin'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Protected Route Component
const ProtectedRestaurantRoute = ({ children }) => {
  const { isRestaurantOwner } = useAuth();
  
  if (!isRestaurantOwner()) {
    return <Navigate to="/restaurant-login" />;
  }
  
  return children;
};

function AppContent() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check user preference for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/restaurant-login" element={<RestaurantLogin />} />
          <Route 
            path="/restaurant-dashboard" 
            element={
              <ProtectedRestaurantRoute>
                <RestaurantDashboard />
              </ProtectedRestaurantRoute>
            } 
          />
          <Route path="/environmental-impact" element={<EnvironmentalImpact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
