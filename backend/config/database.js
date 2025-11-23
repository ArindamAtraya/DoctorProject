const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Get URI from environment - support both MONGO_URI and MONGODB_URI
        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error('MONGO_URI not found in environment variables. Please set MONGO_URI in your .env file.');
        }
        
        console.log('🔗 Connecting to MongoDB...');
        console.log('📍 URI:', mongoURI.replace(/:[^@]*@/, ':****@')); // Hide password
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Make sure:');
        console.error('  1. Your MONGO_URI in .env is correct');
        console.error('  2. Your IP is whitelisted in MongoDB Atlas (Network Access)');
        console.error('  3. Your internet connection is working');
        process.exit(1);
    }
};

module.exports = connectDB;
