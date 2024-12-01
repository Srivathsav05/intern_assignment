import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignmentPortal';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Assignment Submission Portal API is running.');
});

// MongoDB Connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start Server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    });
