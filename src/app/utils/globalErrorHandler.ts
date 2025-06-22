import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

import { TGenericErrorResponse } from "../interfaces/genericErrorResponse";
import handleZodValidationError from "./errorHandlers/zodValidationErrorHandlers";
import handleMongooseValidationError from "./errorHandlers/mongooseValidationErrorHandlers";
import handleMongooseCastError from "./errorHandlers/mongooseCastErrorHandler";
import handleMongooseDuplicateError from "./errorHandlers/mongooseDuplicateErrorHandlers";
import AppError from "./appError";



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let customError: TGenericErrorResponse = {
    success: false,
    message: "Something went wrong",
    statusCode: 500,
    error: err,
    errorSources: [],
  };

  // 1️⃣ Zod validation error
  if (err instanceof ZodError) {
    customError = handleZodValidationError(err);
  }

  // 2️⃣ Mongoose schema validation error
  else if (err instanceof mongoose.Error.ValidationError) {
    customError = handleMongooseValidationError(err);
  }

  // 3️⃣ Mongoose cast error (e.g. invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    customError = handleMongooseCastError(err);
  }

  // 4️⃣ Duplicate key error
  else if ((err as MongoServerError).code === 11000) {
    customError = handleMongooseDuplicateError(err as MongoServerError);
  }

  // 5️⃣ Custom AppError
  else if (err instanceof AppError) {
    customError = {
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      error: err,
      errorSources: [],
    };
  }

  // 6️⃣ Native Error (fallback)
  else if (err instanceof Error) {
    customError = {
      success: false,
      message: err.message || "Internal server error",
      statusCode: 500,
      error: err,
      errorSources: [],
    };
  }

  // Final response
  res.status(customError.statusCode || 500).json({
    success: customError.success,
    message: customError.message,
    error: customError.error,
    // errorSources: customError.errorSources,
  });
};

export default globalErrorHandler;
