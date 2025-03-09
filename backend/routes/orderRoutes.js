const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantId, items, total, deliveryMethod, deliveryAddress, paymentMethod } = req.body;

    const order = new Order({
      userId: req.user.id,
      restaurantId,
      items,
      total,
      deliveryMethod,
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryTime: getEstimatedDeliveryTime(deliveryMethod)
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders for a user
router.get('/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ orderTime: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get all orders for a restaurant
router.get('/restaurant', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'restaurant_owner') {
      return res.status(403).json({ message: 'Access denied. Not a restaurant owner.' });
    }

    const orders = await Order.find({ restaurantId: user.restaurantId })
      .sort({ orderTime: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get a specific order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has access to this order
    if (order.userId.toString() !== req.user.id && 
        !(req.user.role === 'restaurant_owner' && order.restaurantId === req.user.restaurantId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only restaurant owners can update order status
    const user = await User.findById(req.user.id);
    if (user.role !== 'restaurant_owner' || order.restaurantId !== user.restaurantId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});

// Helper function to calculate estimated delivery time
function getEstimatedDeliveryTime(deliveryMethod) {
  const times = {
    bike: '25-35 min',
    ev: '30-40 min',
    drone: '15-20 min'
  };
  return times[deliveryMethod] || '30-45 min';
}

module.exports = router; 