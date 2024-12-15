import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./Auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
const loginUser:RequestHandler=catchAsync(async(req,res)=>{
    const result =await AuthService.loginUser(req.body);
    const {refreshToken}=result;
    res.cookie('refreshToken',refreshToken,{
        secure:false,
        httpOnly:true
    })
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'User login successfully',
        data:{
            accessToken:result.accessToken,
            needPasswordChange:result.needPasswordChange
        }
    })
})
const refreshToken:RequestHandler=catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    console.log(refreshToken)
    const result =await AuthService.refeshToken(refreshToken);
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'User login successfully',
        data:result
        // data:{
        //     accessToken:result.accessToken,
        //     needPasswordChange:result.needPasswordChange
        // }
    })
})
const changePassword:RequestHandler=async(req,res)=>{

}
export const AuthController ={
    loginUser,
    refreshToken
}