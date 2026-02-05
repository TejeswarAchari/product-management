import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/env.config';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
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

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();