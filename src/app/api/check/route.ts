import { userModel } from "@/models/UserModel";
import { usernameSchema } from "@/schemas/signUpSchema";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET (request:NextRequest) {
  const {searchParams} = request.nextUrl ;
   const username = searchParams.get("username") ;  
  //  const result = usernameSchema.safeParse(username); 
  // if(!result.success) {
  //   return NextResponse.json({message :result.error.errors[0].message},{status:400}) ;  
  // }
 
   try {
      await dbConnect() ;
      const usernameUnique = await userModel.findOne({username}) ;
      if(!usernameUnique) {
        return NextResponse.json({message : "Username is available",success:true},{status:400}) ;
      }  
      if(usernameUnique.isVerified) {
        return NextResponse.json({message : "Username is unavailable",success:false},{status:200}) ;

      } 
      return NextResponse.json({message : "Username is available",success:false},{status:400}) ;


   } catch(error:unknown) {
    console.log(error) ;
    return NextResponse.json({message : "error"},{status:500}) ;

   }
  
}