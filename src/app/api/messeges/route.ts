import { userModel } from "@/models/UserModel";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/utils/dbConnect";
import {getServerSession} from "next-auth" ; 
import { NextResponse } from "next/server"; 


export async function GET() {
    const session = await getServerSession(authOptions) ;
    if(!session?.user) {
       return NextResponse.json({message: "User not authenticated",success:false},{status:401}) ;
    }   
   
    try { 
           await dbConnect() ;
       
        const user = await userModel.findOne({username : session?.user.name || session?.user.username}) ;
    
          if (!user) {
            return NextResponse.json({message : "User not found" , success:false},{status:400}) ;
          } 
          
          return NextResponse.json({message : user.messages , success:true},{status:200})
        
    } catch (error) {
        console.log(error) ;
        return NextResponse.json({message: "Error returning the  message acceptance"},{status:500}) ;  
    }
}