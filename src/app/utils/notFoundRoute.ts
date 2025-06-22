import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { IErrorResponse } from "../interfaces/errorResponse";

const notFountRoute = (req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json(<IErrorResponse>{
        message: 'API not found!!',
        success: false,
        error: ''
    })
}

export default notFountRoute