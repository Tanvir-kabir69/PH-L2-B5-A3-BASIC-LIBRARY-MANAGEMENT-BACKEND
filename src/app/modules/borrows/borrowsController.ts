import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { borrowingServices } from "./borrowsServices";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const createABorrowing = catchAsync(async (req: Request, res: Response) => {
  const borrowData = req.body;
  const result = await borrowingServices.createABorrowingIntoDB(borrowData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Borrow book is successful",
    data: result,
  });
});

const getBorrowedBooksSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowingServices.getBorrowedBooksSummaryFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: result,
  });
});

export const borrowingControlelr = {
  createABorrowing,
  getBorrowedBooksSummary
};
