import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../helpers/jwtHelpers";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
export const auth =(...roles:string[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
       try{
        const token = req.headers.authorization;
        if(!token){
            throw new ApiError(httpStatus.UNAUTHORIZED,'you are not authriged')
        }
        const varifiedUser =verifyToken(token,config.jwt.jwt_secret as Secret);
        console.log(varifiedUser)
        if(roles.length&&!roles.includes(varifiedUser.role)){
            throw new ApiError(httpStatus.FORBIDDEN,'Forbidden')
        }
        next()
       }catch(err){
        next(err)
       }
       
    }
}