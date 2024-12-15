import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { fillterableField } from "./admin.consttant";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";


const getAllAdmin:RequestHandler =catchAsync(async(req,res)=>{
    
    const fillters=pick(req.query,fillterableField)
    const options=pick(req.query,['limit', 'page','sortBy','sortOrder'])
    const result =await AdminService.getAllAdminFromDB(fillters,options);
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'Admin facced successfully',
        meta:result.meta,
        data:result.data
    })
 
})
const getAdminById:RequestHandler =catchAsync(async(req,res)=>{
    
    const {adminId}=req.params
    const result =await AdminService.getAdminByFromDB(adminId)
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'Admin facced successfully',
        data:result
    })
 
})
const updatedAdmin:RequestHandler =catchAsync(async(req,res)=>{
    const {adminId}=req.params
    const result =await AdminService.uptdateAdminFromDB(adminId,req.body)
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'Admin updated successfully',
        data:result
    })
})
const deleteAdmin:RequestHandler =catchAsync(async(req,res)=>{
    const {adminId}=req.params
    const result =await AdminService.deleteAdminFromDB(adminId)
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'Admin deleted successfully',
        data:result
    })
})
const shoftDeleteAdmin:RequestHandler =catchAsync(async(req,res)=>{
    const {adminId}=req.params
    const result =await AdminService.shoftDeleteAdminFromDB(adminId)
    sendResponse(res,{
        statuseCode:httpStatus.OK,
        success:true,
        message:'Admin deleted successfully',
        data:result
    })
})
export const AdminController = {
    getAllAdmin,
    getAdminById,
    updatedAdmin,
    deleteAdmin,
    shoftDeleteAdmin
}