import { ObjectId } from 'mongodb';

export const objectidValidator = (value: string) => {
  try {
    return new ObjectId(value);
  } catch (err) {
    return false;
  }
};