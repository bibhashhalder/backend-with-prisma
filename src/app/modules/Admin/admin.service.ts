import { Admin, Prisma, UserStatus } from "@prisma/client"
import { adminSearchableField } from "./admin.consttant"
import { calculatePagination } from "../../../helpers/paginationHelpers"
import { prisma } from "../../../shared/prisma"
import {  IAdminFillterRequest } from "./admin.interface"
import { IPaginationOptions } from "../../interface/pagination"





const getAllAdminFromDB =async(params:IAdminFillterRequest,options:IPaginationOptions)=>{
    console.log(options)
    const {limit,page,skip}=calculatePagination(options)
    const {searchTerm, ...fillterData} = params
    const andConditions:Prisma.AdminWhereInput[] =[]
    if(params.searchTerm){
        andConditions.push({
            OR:adminSearchableField.map(field=>({
                [field]:{
                    contains:params.searchTerm,
                    mode:'insensitive'
                }
            }))
        })
    }
    const objectData =Object.keys(fillterData)
    if(objectData.length>0){
        andConditions.push({
            AND:objectData.map(key=>({
                [key]:{
                    equals:(fillterData as any)[key]
                }
            }))
        })
        
    };
    andConditions.push({
        isDeleted:false
    })
    const whereConditon:Prisma.AdminWhereInput ={AND:andConditions}
    const result =await prisma.admin.findMany({
        where:whereConditon,
        skip,
        take:limit,
        orderBy:options.sortBy&&options.sortOrder?{
            [options.sortBy]:options.sortOrder
        }:{createdAt:'desc'}
    });
    const total =await prisma.admin.count({
        where:whereConditon
    })
    return {
        meta:{
            page,
            limit,
            total
        },
        data:result
    }
}
const getAdminByFromDB =async(id:string):Promise<Admin|null>=>{
    
    const result =await prisma.admin.findUnique({
        where:{
            id,
            isDeleted:false
        }
    })
    return result
}
const uptdateAdminFromDB =async(adminId:string,data:Partial<Admin>):Promise<Admin>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId,
            isDeleted:false
        }
    })
    const result = await prisma.admin.update({
        where:{
            id:adminId
        },
        data
    })
    return result
}
const deleteAdminFromDB =async(adminId:string):Promise<Admin|null>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId
        }
    })
    const result = await prisma.$transaction(async(transactionClient)=>{
        const adminDeletedData =await transactionClient.admin.delete({
            where:{
                id:adminId
            }
        })
        await transactionClient.user.delete({
            where:{
                email:adminDeletedData.email
            }
        
    })
    return adminDeletedData
    })
    return result
}
const shoftDeleteAdminFromDB =async(adminId:string):Promise<Admin|null>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId
        }
    })
    const result = await prisma.$transaction(async(transactionClient)=>{
        const adminDeletedData =await transactionClient.admin.update({
            where:{
                id:adminId
            },
            data:{
                isDeleted:true
            }
        })
       await transactionClient.user.update({
            where:{
                email:adminDeletedData.email
            },
            data:{
                status:UserStatus.DELETED
            }  
        })
    return adminDeletedData
    })
    return result
}
export const AdminService = {
    getAllAdminFromDB,
    getAdminByFromDB,
    uptdateAdminFromDB,
    deleteAdminFromDB,
    shoftDeleteAdminFromDB
}