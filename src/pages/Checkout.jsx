import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('bike');
  const [co2Savings, setCo2Savings] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    specialInstructions: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Simulate fetching cart data from localStorage or context
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedDeliveryMethod = localStorage.getItem('selectedDeliveryMethod');
    const savedRestaurantInfo = localStorage.getItem('restaurantInfo');

    if (savedCart && savedDeliveryMethod && savedRestaurantInfo) {
      setCart(JSON.parse(savedCart));
      setDeliveryMethod(savedDeliveryMethod);
      const restaurantInfo = JSON.parse(savedRestaurantInfo);
      // You can use restaurantInfo here if needed
    } else {
      // If no saved cart data, redirect back to restaurants page
      navigate('/restaurants');
    }
  }, [navigate]);

  // Calculate CO2 savings based on delivery method
  useEffect(() => {
    let savings = 0;
    
    switch(deliveryMethod) {
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
  }, [deliveryMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    // Different fees based on delivery method
    const fees = {
      bike: 2.99,
      ev: 3.99,
      drone: 4.99
    };
    return fees[deliveryMethod] || 2.99;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDeliveryFee();
    return subtotal + deliveryFee;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Payment validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      // Get token and restaurant info
      const token = localStorage.getItem('token');
      const restaurantInfoStr = localStorage.getItem('restaurantInfo');
      const cartItemsStr = localStorage.getItem('cartItems');

      if (!token) {
        throw new Error('Please log in to place an order');
      }

      if (!restaurantInfoStr || !cartItemsStr) {
        throw new Error('Missing order information');
      }

      const restaurantInfo = JSON.parse(restaurantInfoStr);
      const cartItems = JSON.parse(cartItemsStr);

      // Construct order data
      const orderData = {
        restaurantId: Number(restaurantInfo.id),
        items: cartItems.map(item => ({
          id: Number(item.id),
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity)
        })),
        total: Number(calculateTotal()),
        deliveryMethod,
        deliveryAddress: {
          street: formData.address,
          city: formData.city,
          state: 'CA',
          zipCode: formData.zipCode
        },
        paymentMethod: paymentMethod === 'cod' ? 'cash' : 'card'
      };

      console.log('Sending order data:', orderData);
      console.log('Token:', token);

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating order');
      }

      const data = await response.json();
      
      // Clear cart data from localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('selectedDeliveryMethod');
      localStorage.removeItem('restaurantInfo');

      // Set order placed status and ID
      setIsOrderPlaced(true);
      setOrderId(data._id);

    } catch (error) {
      console.error('Error processing order:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to process order. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to order tracking page after order is placed
  useEffect(() => {
    if (isOrderPlaced && orderId) {
      setTimeout(() => {
        navigate(`/order-tracking/${orderId}`);
      }, 2000);
    }
  }, [isOrderPlaced, orderId, navigate]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-white">
          Checkout
        </h1>
        
        {isOrderPlaced ? (
          <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg text-center animate-fadeIn">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2 text-dark dark:text-white">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your order #{orderId} has been placed successfully.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You will be redirected to the order tracking page shortly...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Delivery Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 text-dark dark:text-white">
                    Delivery Information
                  </h2>
                  
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
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
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
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
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
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="address" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.address ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="city" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.city ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="zipCode" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.zipCode ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Delivery Method */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 text-dark dark:text-white">
                    Delivery Method
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        deliveryMethod === 'bike' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setDeliveryMethod('bike')}
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="bike"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'bike'}
                          onChange={() => setDeliveryMethod('bike')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label 
                          htmlFor="bike" 
                          className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Electric Bicycle
                        </label>
                      </div>
                      <div className="text-3xl mb-2">🚲</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fastest for short distances. Eco-friendly and efficient.
                      </p>
                      <p className="text-sm font-medium text-primary mt-2">
                        25-35 min
                      </p>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        deliveryMethod === 'ev' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setDeliveryMethod('ev')}
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="ev"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'ev'}
                          onChange={() => setDeliveryMethod('ev')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label 
                          htmlFor="ev" 
                          className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          EV Van
                        </label>
                      </div>
                      <div className="text-3xl mb-2">🚚</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best for larger orders. Zero-emission electric vehicle.
                      </p>
                      <p className="text-sm font-medium text-primary mt-2">
                        30-45 min
                      </p>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        deliveryMethod === 'drone' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setDeliveryMethod('drone')}
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="drone"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'drone'}
                          onChange={() => setDeliveryMethod('drone')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label 
                          htmlFor="drone" 
                          className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Drone Delivery
                        </label>
                      </div>
                      <div className="text-3xl mb-2">🚁</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fastest option. Perfect for remote areas.
                      </p>
                      <p className="text-sm font-medium text-primary mt-2">
                        15-20 min
                      </p>
                    </div>
                  </div>
                  
                  {/* CO2 Savings */}
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">🌱</div>
                      <div>
                        <p className="text-sm font-medium text-dark dark:text-white">
                          Your eco-impact with this delivery:
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You'll save <span className="font-semibold text-primary">{co2Savings} kg</span> of CO₂ emissions compared to traditional delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 text-dark dark:text-white">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        paymentMethod === 'cod' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label 
                          htmlFor="cod" 
                          className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        paymentMethod === 'card' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label 
                          htmlFor="card" 
                          className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Credit / Debit Card
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Details (shown only if card payment is selected) */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label 
                          htmlFor="cardNumber" 
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                            errors.cardNumber ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label 
                            htmlFor="cardExpiry" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                              errors.cardExpiry ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cardExpiry && (
                            <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>
                          )}
                        </div>
                        
                        <div>
                          <label 
                            htmlFor="cardCvv" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="123"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                              errors.cardCvv ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cardCvv && (
                            <p className="mt-1 text-sm text-red-500">{errors.cardCvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Add any special instructions for delivery..."
                  ></textarea>
                </div>
              </form>
            </div>
            
            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-dark dark:text-white">
                  Order Summary
                </h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium text-dark dark:text-white">
                          {item.quantity}x {item.name}
                        </p>
                      </div>
                      <p className="text-dark dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Order Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-dark dark:text-white">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="text-dark dark:text-white">${calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-dark dark:text-white">Total</span>
                    <span className="text-dark dark:text-white">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                {/* CO2 Savings */}
                <div className="bg-primary/10 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🌱</div>
                    <div>
                      <p className="text-sm font-medium text-dark dark:text-white">
                        CO₂ Savings:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-primary">{co2Savings} kg</span> of CO₂ emissions saved
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`w-full btn btn-primary py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Place Order'
                  )}
                </button>
                
                {/* Back to Restaurant Button */}
                <Link 
                  to="/restaurants"
                  className="block text-center mt-4 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 