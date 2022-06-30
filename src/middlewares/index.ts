import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { MulterError } from "multer";
import { ErrorHandler } from "../handler-exceptions/error-handler";
import { HttpStatus } from "../utils/enums/http-status.enum";

export function validator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = HttpStatus.BAD_REQUEST;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(statusCode)
      .json({ errors: errors.array(), statusCode });
  }
  next();
}

export function errorHandler(
  error: ErrorHandler,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const errorDto = {
    message: "Internal server error",
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
  if (error.name === "Error") {
    if (!error.message) {
      return response.status(errorDto.statusCode).json(errorDto);
    }
    errorDto.message = error.message;
    return response.status(errorDto.statusCode).json(errorDto);
  }
  if (error instanceof MulterError) {
    errorDto.message = error.message;
    error.statusCode = HttpStatus.BAD_REQUEST;
  }
  errorDto.message = error.message;
  errorDto.statusCode = error.statusCode;
  return response.status(error.statusCode).json(errorDto);
}
