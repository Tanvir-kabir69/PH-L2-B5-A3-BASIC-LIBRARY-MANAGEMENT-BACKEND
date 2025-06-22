import mongoose from "mongoose"
import app from "./app"
import config from "./app/config"

const PORT = config.PORT
const DB_URL = config.DB_URL

const bootstrap = async () => {
    try{
        await mongoose.connect(`${DB_URL}`)
        console.log('Successfully connected to mongoDB using Mongoose !')
    }catch(error){
        throw new Error('Problems in connecting mongoDB')
    }

    try{
        await app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`)
        })
    }catch(error){
        throw new Error('Problems in starting server')
    }
}

bootstrap()