import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { connectDB } from '../src/config/db.js';
import { UserModel } from '../src/models/user.js';
import { ProductModel } from '../src/models/product.js';

const products = [
  { name: 'Laptop', category: 'Electronics', price: 999.99, quantity: 10 },
  { name: 'Smartphone', category: 'Electronics', price: 699.99, quantity: 20 },
  { name: 'Wireless Mouse', category: 'Electronics', price: 29.99, quantity: 50 },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 79.99, quantity: 30 },
  { name: 'Desk Chair', category: 'Furniture', price: 149.99, quantity: 15 },
  { name: 'Office Desk', category: 'Furniture', price: 249.99, quantity: 10 },
  { name: 'Water Bottle', category: 'Accessories', price: 19.99, quantity: 100 },
  { name: 'Notebook', category: 'Accessories', price: 9.99, quantity: 200 },
  { name: 'Bluetooth Speaker', category: 'Electronics', price: 45.00, quantity: 40 },
  { name: 'Table Lamp', category: 'Furniture', price: 35.00, quantity: 25 },
  { name: 'USB-C Cable', category: 'Electronics', price: 12.99, quantity: 150 },
  { name: 'Monitor', category: 'Electronics', price: 199.99, quantity: 20 },
];

async function seed() {
  try {
    await connectDB();

    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);
    await UserModel.create({
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    });

    const userPassword = await bcrypt.hash('user123', 10);
    await UserModel.create({
      username: 'user',
      password: userPassword,
      role: 'user',
    });

    await ProductModel.insertMany(products);

    console.log('Seed complete.');
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
