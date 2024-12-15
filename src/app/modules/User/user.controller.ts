import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin =async(req:Request,res:Response)=>{
    try{
        const result =await UserService.createAdminFromDB(req.body)
        res.status(200).json({
            success:true,
            message:'admin created successfully',
            data:result
        })
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message||'something went wrong',
            error:err
        })
    }
    
}
export const UserController ={
    createAdmin
}