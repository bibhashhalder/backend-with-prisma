import { UserStatus } from "@prisma/client"
import { genetateToken, verifyToken } from "../../../helpers/jwtHelpers"
import { prisma } from "../../../shared/prisma"
import bcrypt from 'bcrypt'
import config from "../../config"
import { Secret } from "jsonwebtoken"



const loginUser =async(payload:{
    email:string,
    password:string
})=>{
    console.log('user login now',payload)
    const userData =await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email
        }
    });
    const isCorrectPassword:boolean =await bcrypt.compare(payload.password,(userData as any).password);
    if(!isCorrectPassword){
        throw new Error('Password incorrect')
    }
    const accessToken =genetateToken({
        email:userData.email,
        role:userData.role
        },
        config.jwt.jwt_secret as string,
       config.jwt.expires_in as string
   );
   const refreshToken =genetateToken({
    email:userData.email,
    role:userData.role
    },
    config.jwt.refresh_token_secret as string,
   config.jwt.refresh_token_expires_in as string
);
   return {
    accessToken,
    refreshToken,
    needPasswordChange:userData.needPasswordChange

   }
}
const refeshToken =async(token:string)=>{
    let decodedData;
    try{
         decodedData =verifyToken(token,config.jwt.refresh_token_secret as Secret);
    console.log(decodedData)
    }
    catch(err){
        throw new Error('You are not authorized')
    }
    const userData =await prisma.user.findUniqueOrThrow({
        where:{
            email:decodedData.email,
            status:UserStatus.ACTIVE
        }
    });
    const accessToken =genetateToken({
        email:userData.email,
        role:userData.role
        },
        config.jwt.jwt_secret as string,
       config.jwt.expires_in as string
   );
   return {
    accessToken,
    needPasswordChange:userData?.needPasswordChange

   }
}
const changePassword =async()=>{}
export const AuthService ={
    loginUser,
    refeshToken,
    changePassword
}