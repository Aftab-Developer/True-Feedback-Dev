import { userModel } from "@/models/UserModel";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/utils/dbConnect";
import {getServerSession} from "next-auth" ; 
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
 const session = await getServerSession(authOptions) ;
 if(!session?.user) {
    return NextResponse.json({message: "User not authenticated"},{status:401}) ;
 }    

 const {AcceptingMessage , userIds} = await request.json() ;
 try {
    console.log(userIds)
    await dbConnect() ;
 
    const user = await userModel.updateOne(
        {username : userIds ?? session?.user.username} ,
        {$set : {isAcceptingMessages : AcceptingMessage} }
    )
     
    if(!user) {
    return NextResponse.json({message : "User not found" ,success:false},{status:400}) ;
 }  
    return NextResponse.json({message :"update the accetpting messege field",success:true },{status:200}) ;
 } 
 catch(error) {
    console.log(error) ;
    return NextResponse.json({message: "Error while accepting message",success:false},{status:500}) ;
 }

} 

export async function GET() {
    const session = await getServerSession(authOptions) ;
    if(!session?.user) {
       return NextResponse.json({message: "User not authenticated"},{status:401}) ;
    }   
   
    const userId = session?.user._id ; 

    try { 

        await dbConnect() ;
        const user = await userModel.findById(userId) ; 
        if(!user) {
            return NextResponse.json({message : "User not found" },{status:400}) ;
        } 
        const message = user?.isAcceptingMessages ;
        return NextResponse.json({message , success:true} , {status:200})

    } catch(error) {
        console.log(error) ;
        return NextResponse.json({message: "Error returning the  message acceptance",success:false},{status:500}) ;  
    }
}