import { IErrorResponse } from "./errorResponse";

export type TErrorSources = {
    path: string | number;
    message: string
}[]

// type TGenericErrorResponse = {
//     message: string;
//     success: boolean;
//     statusCode: number;
//     errorSources?: TErrorSources
// }

export type TGenericErrorResponse = IErrorResponse & {
    statusCode?: number;
    errorSources?: TErrorSources
}