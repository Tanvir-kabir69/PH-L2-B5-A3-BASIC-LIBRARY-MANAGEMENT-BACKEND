import mongoose, { Schema, model } from "mongoose";
import { IBorrow, IBorrowModel } from "./borrowsInterface";
import AppError from "../../utils/appError";
import { BookModel } from "../books/booksSchimaModel";

const BorrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be a positive integer"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      // virtuals: true,
      transform: (_, ret) => {
        delete ret.__v; // ✅ Remove __v
        return ret;
      },
    },
  }
);

// export const BorrowModel = model<IBorrow>("Borrow", BorrowSchema);

BorrowSchema.statics.validateDueDateAndFormat = function (
  rawDueDate: string | Date
): Date {
  const dueDate = new Date(rawDueDate);

  // Check if it's a valid date
  if (isNaN(dueDate.getTime())) {
    throw new AppError(400, "Due date is invalid");
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize today to midnight

  // Check if it's a past date
  const checkDate = new Date(dueDate);
  checkDate.setHours(0, 0, 0, 0);

  if (checkDate < now) {
    throw new AppError(400, "Due date cannot be in the past");
  }

  // If the input has only date (no time), normalize it to midnight
  if (
    typeof rawDueDate === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(rawDueDate.trim())
  ) {
    return new Date(`${rawDueDate}T00:00:00.000Z`);
  }

  return dueDate;
};

BorrowSchema.statics.validateBookAvailablityAndUpdate = async function (
  borrowData: IBorrow
): Promise<IBorrow> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { book, quantity, dueDate } = borrowData;

    // Step 1: ✅ Check and update book
    const bookDoc = await BookModel.findById(book).session(session);
    if (!bookDoc) throw new AppError(404, "Requested Book not found");

    if (bookDoc.copies === 0) {
      throw new AppError(400, "No copy left to borrow");
    }

    if (bookDoc.copies < quantity) {
      throw new AppError(400, "Not enough copies available");
    }

    bookDoc.copies -= quantity;
    if (bookDoc.copies === 0) {
      bookDoc.available = false;
    }

    bookDoc.updatedAt = new Date();
    await bookDoc.save({ session });

    // Step 2: ✅ Update or insert borrow record
    let finalBorrowDoc: IBorrow | null;

    const existingBorrow = await BorrowModel.findOne({ book }, null, {
      session,
    });

    if (existingBorrow) {
      existingBorrow.quantity += quantity;
      existingBorrow.updatedAt = new Date();
      finalBorrowDoc = await existingBorrow.save({ session });
      console.log("📌 Borrow record updated.");
    } else {
      const newBorrow = new BorrowModel({
        book,
        quantity,
        dueDate,
      });
      finalBorrowDoc = await newBorrow.save({ session });
      console.log("📌 New borrow record created.");
    }

    // Step 3: ✅ Commit and return updated/created borrow doc
    await session.commitTransaction();
    session.endSession();

    return finalBorrowDoc!;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const BorrowModel = model<IBorrow, IBorrowModel>("Borrow", BorrowSchema);
