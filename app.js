import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import router from './routes/routes.js'
import { CustomError } from './errorHandlers/errors.js'

app.use(express.json())
app.use('/', router)




app.use((err,req, res, next)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({message: err.message})
    }
    //console.log(err)
   // Sentry.captureException(err)
    res.status(500).json({message: err.message})
})

export default app
