import { IBorrow } from "./borrowsInterface";
import { BorrowModel } from "./borrowsSchimaModel";

const createABorrowingIntoDB = async (borrowData: IBorrow) => {
  const { dueDate } = borrowData;
  const refinedDueDate = await BorrowModel.validateDueDateAndFormat(dueDate);
  const refinedBorrowData = { ...borrowData, dueDate: refinedDueDate };
  const validatedBorrowData =
    await BorrowModel.validateBookAvailablityAndUpdate(refinedBorrowData);
  return validatedBorrowData;
};

const getBorrowedBooksSummaryFromDB = async () => {
  const summary = await BorrowModel.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books", // collection name in MongoDB
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  return summary;
};

export const borrowingServices = {
  createABorrowingIntoDB,
  getBorrowedBooksSummaryFromDB
};
