import express from 'express'
import { IRouter } from "express";
import booksRouter from '../modules/books/booksRouter';
import borrowRouter from '../modules/borrows/borrowsRouter';

const router: IRouter  = express.Router()

router.use('/books', booksRouter)
router.use('/borrow', borrowRouter)

export default router