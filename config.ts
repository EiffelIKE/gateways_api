import dotenv from 'dotenv';

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/gateways_db',
  mongoURITest: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gateways_test',
};

export const { port, mongoURI, nodeEnv, mongoURITest } = config;