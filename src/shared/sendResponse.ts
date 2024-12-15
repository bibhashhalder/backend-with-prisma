import { Response } from "express"

export const sendResponse =<T>(res:Response, jsonData:{
    statuseCode:number,
    success:boolean,
    message:string
    meta?:{
        page:number,
        limit:number,
        total:number
    },
    data:T|null|undefined
})=>{
    res.status(jsonData.statuseCode).json({
        success:jsonData.success,
        message:jsonData.message,
        meta:jsonData.meta||null||undefined,
        data:jsonData.data||null||undefined
    })
}