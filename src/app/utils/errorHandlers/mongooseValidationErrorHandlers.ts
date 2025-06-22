import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interfaces/genericErrorResponse";

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: error.path,
      message: error.message,
    })
  );

  return {
    success: false,
    message: "Validation Error",
    error: err,
    statusCode: 400,
    errorSources,
  };
};

export default handleMongooseValidationError;
