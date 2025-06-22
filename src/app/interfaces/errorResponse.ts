export interface IErrorResponse {
  success: false;
  message: string;
  error: any; // can replace 'any' with a more specific type like 'ZodError | Error' if needed
}