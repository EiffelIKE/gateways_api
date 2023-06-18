import { Gateway } from './gateways.model';

import { db } from '../../db';
import { ObjectId } from 'mongodb';

export const Gateways = db.collection<Gateway>('gateways');

export const list = async () => {
  const result = await Gateways.find().toArray();
  return result;
};

export const findOne = async (id: string) => {
  const result = await Gateways.findOne({
    _id: new ObjectId(id),
  });
  return result;
};

export const saveGateway = async (gateway: Gateway) => {
  const { serialNumber } = gateway;
  const existedSerial = await Gateways.findOne({ serialNumber });
  if (!existedSerial) {
    const result = await Gateways.insertOne(gateway);
    if (!result.acknowledged) {
      throw new Error('Error while insterting gateway');
    }
    return result.insertedId;
  } throw new Error('A gateway with same serial number already exist');
};

export const updateById = async (gateway: Gateway, id: string) => {
  if (gateway.devices?.length > 10) {
    throw new Error('Only 10 devices per Gateway');
  }
  const updatedGateway = await Gateways.findOneAndUpdate({ 
    _id: new ObjectId(id),
  }, {
    $set: gateway,
  }, {
    returnDocument: 'after',
  });
  return updatedGateway.value;

};

export const deleteById = async (id: string) => {
  const result = await Gateways.findOneAndDelete({ 
    _id: new ObjectId(id),
  });
  return result.value;
};