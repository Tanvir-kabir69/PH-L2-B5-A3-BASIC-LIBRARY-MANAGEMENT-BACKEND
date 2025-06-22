import { Request, Response } from "express";
import status from "http-status";

const getAController = async (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json('Hello, Welcome to the Library!')
    Promise.resolve()
}

export default getAController