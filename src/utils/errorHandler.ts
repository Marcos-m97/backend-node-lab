import { Request, Response, NextFunction } from "express";

export class AppErrors {
  constructor(public message: string, public code: number) {}
}

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppErrors) {
    res.status(error.code).json({ error: error.message });
    return;
  } else {
    res.status(500).json({ error: "internal server error" });
  }
}

export default errorHandler;


