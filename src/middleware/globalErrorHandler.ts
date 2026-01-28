import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Something went wrong!";
  let errorSource = "AppError";


  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Validation Error: Please check your input fields and types.";
    errorSource = "PrismaValidationError";
  } 
  
 
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    errorSource = "PrismaDatabaseError";
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        errorMessage = `Duplicate entry: A record with this ${err.meta?.target} already exists.`;
        break;
      case "P2025": 
        statusCode = 404;
        errorMessage = "Resource not found: The record you are trying to access does not exist.";
        break;
      case "P2003": 
        statusCode = 400;
        errorMessage = "Dependency Error: This record is linked to other data and cannot be modified.";
        break;
      default:
        statusCode = 500;
        errorMessage = `Database Error: ${err.code}`;
    }
  }


  else if (err.name === "UnauthorizedError" || err.status === 401) {
    statusCode = 401;
    errorMessage = "Your session has expired or is invalid. Please log in again.";
  }

  else if (err instanceof Error) {
    errorMessage = err.message;
  }


  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    errorSource, 
   
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, 
    details: err.meta || null
  });
};

export default globalErrorHandler;