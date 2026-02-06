import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/env.config';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors({ 
  origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://product-management-omega-ruby.vercel.app"
    ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use((req, res, next) => {
  req.setTimeout(30000);
  res.setTimeout(30000);
  next();
});

app.use('/api/products', productRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`Connected to MongoDB (${config.NODE_ENV})`);

    const server = app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });

    // Graceful shutdown for production (Docker, PaaS, etc.)
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
      });
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();