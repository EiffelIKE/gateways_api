import { ZodIssue } from 'zod';
export interface MessageResponse {
  message: string | ZodIssue[];
}
