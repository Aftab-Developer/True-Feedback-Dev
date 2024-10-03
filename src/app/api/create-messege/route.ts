import { message, userModel } from "@/models/UserModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  const {username , content} = await request.json() ;
  try {
      await dbConnect() ; 
      const user = await userModel.findOne({username}) ;
      if(!user) {
        return NextResponse.json({message: "User not found",success:false},{status:404}) ;
      } 

    if(!user.isAcceptingMessages) {
        return NextResponse.json({message: "User is not accepting messeges",success:false},{status:403}) ;
    } 

    user.messages.push({content , createdAt : new Date()} as message) ; 
    await user.save() ; 
    return NextResponse.json({message: "Message sent successfully",success:true},{status:200}) ;

  } catch (error) {
    console.log(error) ;
        return NextResponse.json({message: "Error returning the  message acceptance",success:false},{status:500}) ;  
  }
}