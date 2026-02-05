import dotenv from 'dotenv';
import path from 'path';


const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.test';
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  CORS_ORIGIN: string;
}


if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is strictly required in environment variables');
}

export const config: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};