import { userModel } from "@/models/UserModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
     const {verifyCode,username} = await request.json() ; 
     if(!verifyCode) {
        return NextResponse.json({message : "Invalid Code"},{status:400}) ;
     }  

     try { 
        const decodeUsername  = decodeURIComponent(username) as string ;
         await dbConnect() ; 
         const user  = await userModel.findOne({username : decodeUsername})
         if(!user ) {
            return NextResponse.json({message : "user not found",success:false},{status:400}) ;
         }  
         
         const isCodeValid = user.verifyCode === verifyCode  ;
         if(isCodeValid) {
            const codeNotExpired = new Date(user.verifyCodeExpiry) > new Date() ; 
            if(codeNotExpired) { 
                user.isVerified = true ; 
                await user.save() ;
                return NextResponse.json({message : "Account Verified Successfully",success:true},{status:200}) ;
            } else {
                return NextResponse.json({message : "Verify code expired plse signup again to get new code"},{status:400}) ;
            }
         }   else {
            return NextResponse.json({message : "Invaild code",success:false},{status:400}) ;
         }

         
     } catch (error) {
        console.error(error);
        
     }
}