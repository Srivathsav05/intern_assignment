import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // For parsing application/json

// Routes
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
