import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/homemeal';

async function seed() {
  await mongoose.connect(uri);
  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin user already exists:', existing.email);
    process.exit(0);
    return;
  }
  await User.create({
    name: 'Admin',
    email: 'admin@homemeal.com',
    password: 'admin123',
    role: 'admin',
    approvedAsHomemaker: false,
  });
  console.log('Admin user created: admin@homemeal.com / admin123');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
