import * as z from 'zod';
import { objectidValidator } from '../validators/objectidValidator';

export const ParamsWithId = z.object({
  id: z.string().min(1).refine((value) => objectidValidator(value), { message: '[validation]: Invalid ObjectId' }),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;