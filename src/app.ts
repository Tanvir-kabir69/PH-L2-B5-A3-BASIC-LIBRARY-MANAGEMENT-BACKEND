import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/utils/globalErrorHandler';
import getAController from './app/utils/getAController';
import notFountRoute from './app/utils/notFoundRoute';

const app : Application = express()

app.use(express.json());

const baseApi : string = '/api'
app.use(baseApi, router)


app.get('/', getAController)

app.use(notFountRoute)
app.use(globalErrorHandler)

export default app