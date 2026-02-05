import dotenv from 'dotenv';
import path from 'path';

const envName = process.env.NODE_ENV === 'production' ? 'production' : 'test';
const envFile = `.env.${envName}`;
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  CORS_ORIGIN: string;
}


const requireEnv = (key: keyof EnvConfig): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is strictly required in environment variables`);
  }
  return value;
};

export const config: EnvConfig = {
  NODE_ENV: requireEnv('NODE_ENV'),
  PORT: parseInt(requireEnv('PORT'), 10),
  MONGODB_URI: requireEnv('MONGODB_URI'),
  CORS_ORIGIN: requireEnv('CORS_ORIGIN')
};