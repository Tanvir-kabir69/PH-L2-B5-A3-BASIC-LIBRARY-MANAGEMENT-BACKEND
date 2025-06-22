import { NextFunction, Request, Response } from "express";
import { booksServices } from "./booksServices";
import { bookZodSchema } from "./booksZodValidationSchima";
import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createABook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const zodParseBookData = bookZodSchema.parse(bookData);
  const result = await booksServices.createABookIntoDB(zodParseBookData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await booksServices.getAllBooksFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Books data is retrived successfully !",
    data: result,
  });
});

const getASingleBookById = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await booksServices.getASingleBookByIdFromDB(bookId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Book of id-${bookId} is retrived successfully`,
    data: result,
  });
});

const updateASingleBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const updatedData = req.body;
  const result = await booksServices.updateASingleBookIntoDB(
    bookId,
    updatedData
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Book of id-${bookId} is updated successfully`,
    data: result,
  });
});

const deleteASingleBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await booksServices.deleteASingleBookFromDB(bookId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Book of id-${bookId} is deleted successfully`,
    data: result,
  });
});

export const booksControler = {
  createABook,
  getAllBooks,
  getASingleBookById,
  updateASingleBook,
  deleteASingleBook,
};
