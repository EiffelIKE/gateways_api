import { WithId } from 'mongodb';
import * as z from 'zod';
import { ipv4Validator } from '../../validators';
import { dateValidator } from '../../validators/dateValidator';

export const Device = z.object({
  uid: z.number().min(1),
  vendor: z.string().min(1),
  created_at: z.string().default(new Date().toISOString()).optional().refine(value => dateValidator(value)),
  status: z.string().refine((value) => {
    return value === 'offline' || value === 'online';
  }, '[validation]: Invalid status value'),
});

export const DeviceArr = z.object({
  devices: z.array(Device),
});

export type DeviceArr = z.infer<typeof DeviceArr>;

export type Device = z.infer<typeof Device>;
export type DeviceWithId = WithId<Device>;

export const Gateway = z.object({
  serialNumber: z.string().min(1),
  name: z.string().min(1),
  ipv4: z.string().refine((value) => ipv4Validator(value), '[validation]: Invalid IPv4 address'),
  devices: z.array(Device).max(10, '[validation]: Only 10 devices per gateway'),
});

export type Gateway = z.infer<typeof Gateway>;
export type GatewayWithId = WithId<Gateway>;
