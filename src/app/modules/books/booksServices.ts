import { IBook } from "./booksInterface";
import { BookModel } from "./booksSchimaModel";

const createABookIntoDB = async (bookData: IBook) => {
  const result = await BookModel.create(bookData);
  return result;
};

const getAllBooksFromDB = async (queryData: any) => {
  const filter: Record<string, unknown> = {};
  if (queryData?.filter) {
    filter.genre = queryData.filter;
  }
  const sortBy: string = queryData?.sortBy ? queryData.sortBy : "createdAt";
  const sortOrder: "asc" | "desc" = queryData.sort === "desc" ? "desc" : "asc";
  const sort = sortOrder === "desc" ? -1 : 1;
  const limit: number = parseInt(queryData.limit) || 10;

  const allBooksData = await BookModel.find(filter)
    .sort({ [sortBy]: sort })
    .limit(limit);
  return allBooksData;
};

const getASingleBookByIdFromDB = async (bookId: string) => {
  const result = await BookModel.findById({ _id: bookId });
  return result;
};

const updateASingleBookIntoDB = async (
  bookId: string,
  updatedData: Partial<IBook>
) => {
  console.log(bookId, ",", updatedData);
  const result = await BookModel.findByIdAndUpdate(
    { _id: bookId },
    { $set: updatedData },
    { runValidators: true, timestamps: true, new: true }
  );
  return result;
};

const deleteASingleBookFromDB = async (bookId: string) => {
  const result = await BookModel.deleteOne({ _id: bookId });
  console.log(result);
  if (result?.deletedCount == 1) {
    return null;
  } else {
    throw new Error(`Book of id-${bookId} is not deleted successfully`);
  }
};

export const booksServices = {
  createABookIntoDB,
  getAllBooksFromDB,
  getASingleBookByIdFromDB,
  updateASingleBookIntoDB,
  deleteASingleBookFromDB,
};
