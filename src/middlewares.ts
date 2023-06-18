import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { ErrorResponse, RequestValidator } from './interfaces';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const responseData : ErrorResponse = {
    message: err.message,
  };
  if (process.env.NODE_ENV !== 'production') {
    responseData.stack = err.stack;
  }
  if (err instanceof ZodError) {
    responseData.message = err.issues;
  }
  res.status(statusCode);
  res.json({
    ...responseData,
  });
}



export const validateRequest =  (validators: RequestValidator) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
};
