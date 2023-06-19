import { MongoClient } from 'mongodb';
import { mongoURI, nodeEnv, mongoURITest } from '../config';

const dbURI = nodeEnv === 'test' ? mongoURITest : mongoURI;

export const client = new MongoClient(dbURI);
export const db = client.db();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('[db]: Connected to the database');
  } catch (error) {
    console.error('[db]:Error connecting to the database:', error);
  }
};
