import express, { IRouter } from "express";
import { booksControler } from "./booksController";

const booksRouter: IRouter = express.Router();

booksRouter.post("/", booksControler.createABook);
booksRouter.get("/", booksControler.getAllBooks);
booksRouter.get("/:bookId", booksControler.getASingleBookById);
booksRouter.put("/:bookId", booksControler.updateASingleBook);
booksRouter.delete("/:bookId", booksControler.deleteASingleBook);

export default booksRouter;
