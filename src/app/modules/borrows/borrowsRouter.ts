import express, { IRouter } from 'express'
import { borrowingControlelr } from './borrowsController'

const borrowRouter : IRouter = express.Router()

borrowRouter.post('/', borrowingControlelr.createABorrowing)
borrowRouter.get('/', borrowingControlelr.getBorrowedBooksSummary)

export default borrowRouter