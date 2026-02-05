import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../constants/app.constants';

export class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json({ message: err.message || 'Internal server error' });
};
