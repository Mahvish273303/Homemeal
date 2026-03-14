import mongoose from 'mongoose';

const LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/homemeal';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || LOCAL_MONGO_URI;

  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
