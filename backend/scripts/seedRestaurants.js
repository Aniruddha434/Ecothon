const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const restaurantOwners = [
  {
    name: 'Green Bistro Owner',
    email: 'green_bistro@example.com',
    password: 'GreenBistro123',
    role: 'restaurant_owner',
    restaurantId: 1
  },
  {
    name: 'Veggie Delight Owner',
    email: 'veggie_delight@example.com',
    password: 'VeggieDelight123',
    role: 'restaurant_owner',
    restaurantId: 2
  },
  {
    name: 'Ocean Fresh Owner',
    email: 'ocean_fresh@example.com',
    password: 'OceanFresh123',
    role: 'restaurant_owner',
    restaurantId: 3
  },
  {
    name: 'Eco Burger Owner',
    email: 'eco_burger@example.com',
    password: 'EcoBurger123',
    role: 'restaurant_owner',
    restaurantId: 4
  },
  {
    name: 'Green Curry House Owner',
    email: 'green_curry@example.com',
    password: 'GreenCurry123',
    role: 'restaurant_owner',
    restaurantId: 5
  },
  {
    name: 'Sustainable Sushi Owner',
    email: 'sustainable_sushi@example.com',
    password: 'SushiGreen123',
    role: 'restaurant_owner',
    restaurantId: 6
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing restaurant owners
    await User.deleteMany({ role: 'restaurant_owner' });
    console.log('Cleared existing restaurant owners');

    // Create restaurant owners
    for (const owner of restaurantOwners) {
      const hashedPassword = await bcrypt.hash(owner.password, 10);
      await User.create({
        ...owner,
        password: hashedPassword
      });
      console.log(`Created owner for ${owner.name}`);
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 