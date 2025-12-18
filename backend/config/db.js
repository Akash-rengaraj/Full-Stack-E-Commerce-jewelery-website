const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        // Try connecting to local MongoDB first
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sanjana-creations', {
            bufferCommands: false,
            serverSelectionTimeoutMS: 2000 // Short timeout to fail fast
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Local MongoDB connection failed. Starting In-Memory MongoDB...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose.connect(uri, {
                bufferCommands: false,
            });
            console.log(`MongoDB Connected: ${conn.connection.host} (In-Memory)`);
            console.log('WARNING: Data will be lost when server restarts.');
        } catch (memError) {
            console.error(`Fatal Error: Could not start in-memory DB: ${memError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
