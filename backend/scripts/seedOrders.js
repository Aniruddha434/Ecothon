const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Order = require('../models/Order');

dotenv.config();

const generateRandomOrder = (userId, restaurantId) => {
  const items = [
    { id: 101, name: 'Organic Garden Salad', price: 8.99 },
    { id: 102, name: 'Seasonal Soup', price: 6.99 },
    { id: 103, name: 'Bruschetta', price: 7.99 },
    { id: 104, name: 'Vegetable Risotto', price: 14.99 },
    { id: 105, name: 'Quinoa Bowl', price: 13.99 },
    { id: 106, name: 'Eggplant Parmesan', price: 15.99 },
    { id: 107, name: 'Fruit Tart', price: 6.99 },
    { id: 108, name: 'Chocolate Avocado Mousse', price: 7.99 }
  ];

  const deliveryMethods = ['bike', 'ev', 'drone'];
  const statuses = ['new', 'preparing', 'ready', 'out-for-delivery', 'delivered'];
  const paymentMethods = ['card', 'cash'];

  // Select 1-4 random items
  const selectedItems = [];
  const numItems = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numItems; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    selectedItems.push({ ...item, quantity });
  }

  // Calculate total
  const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Generate random order time within the last 24 hours
  const orderTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));

  return {
    userId,
    restaurantId,
    items: selectedItems,
    total,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    orderTime,
    deliveryMethod: deliveryMethods[Math.floor(Math.random() * deliveryMethods.length)],
    deliveryAddress: {
      street: '123 Green Street',
      city: 'Eco City',
      state: 'EC',
      zipCode: '12345'
    },
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    paymentStatus: Math.random() > 0.2 ? 'paid' : 'pending' // 80% chance of being paid
  };
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Get all users
    const users = await User.find({ role: 'user' });
    if (users.length === 0) {
      console.log('No users found. Please run the user seeding script first.');
      process.exit(1);
    }

    // Create 20 random orders
    const orders = [];
    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const restaurantId = Math.floor(Math.random() * 6) + 1; // Random restaurant ID (1-6)
      const order = generateRandomOrder(user._id, restaurantId);
      orders.push(order);
    }

    // Save orders to database
    await Order.insertMany(orders);
    console.log(`Created ${orders.length} test orders`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 