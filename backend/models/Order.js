const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: Number,
    required: true,
    min: [1, 'Restaurant ID must be at least 1'],
    max: [6, 'Restaurant ID cannot exceed 6']
  },
  items: [{
    id: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'new'
  },
  orderTime: {
    type: Date,
    default: Date.now
  },
  deliveryMethod: {
    type: String,
    enum: ['bike', 'ev', 'drone'],
    required: true
  },
  estimatedDeliveryTime: String,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  co2Saved: {
    type: Number,
    default: 0
  }
});

// Calculate CO2 savings based on delivery method and update co2Saved field
orderSchema.pre('save', function(next) {
  if (this.isModified('deliveryMethod')) {
    const co2Factors = {
      bike: 0,      // Electric bikes have zero direct emissions
      ev: 30,       // Electric vehicles have some emissions from electricity generation
      drone: 25     // Drones have emissions from electricity
    };
    
    // Traditional delivery would emit about 120g CO2 per km
    // Assuming average delivery distance of 5km
    const distance = 5;
    const traditionalEmissions = 120 * distance;
    const selectedEmissions = co2Factors[this.deliveryMethod] * distance;
    
    // Calculate savings in kg
    this.co2Saved = (traditionalEmissions - selectedEmissions) / 1000;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 