import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../app/config';
export const genetateToken =(payload:any,secret:string,expiresIn:string)=>{
    const token =jwt.sign(
        payload,
        secret,
        {
            algorithm:'HS256',
            expiresIn
        },
        
    );
    return token
}
export const verifyToken =(token:string,secret:Secret)=>{
    return jwt.verify(token,secret) as JwtPayload
}