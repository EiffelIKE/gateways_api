import * as z from 'zod';

const dateScheme = z.date();

export const dateValidator = (value?: string) => {
  if (value) {
    return dateScheme.safeParse(new Date(value));
  }
};