import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import { golobalError } from './app/middleWares/golobaseError'
import status from 'http-status'
import cookieParser from 'cookie-parser'
const app:Application =express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.get('/',(req:Request,res:Response)=>{
    res.send({message:'api is created successfully'})
})
app.use('/api/v1',router)
app.use(golobalError)
app.use((req:Request,res:Response,next:NextFunction)=>{

    res.status(status.NOT_FOUND).json({
        success:false,
        message:'API NOT FOUND',
        error:{
            path:req.originalUrl,
            message:'Your request is not found'
        }
    })
})

export default app;