import { AnyZodObject } from 'zod';

export interface RequestValidator {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}