import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBorrowModel extends Model<IBorrow> {
  validateDueDateAndFormat(rawDueDate: string | Date): Date;
  validateBookAvailablityAndUpdate(borrowData: IBorrow): IBorrow;
}
