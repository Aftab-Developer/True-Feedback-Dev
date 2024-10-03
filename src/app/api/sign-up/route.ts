import { userModel } from "@/models/UserModel";
import { dbConnect } from "@/utils/dbConnect"; 
import {NextRequest , NextResponse} from "next/server" ; 
import bcrypt from "bcrypt" ; 
import {sendEmail} from "@/helpers/sendEmail"
export async function POST (request : NextRequest ) {
     try {  
       const {username,email,password} = await request.json() ;  
       
       await dbConnect() ;
       const findUserByName = await userModel.findOne({username}) ;
       if(findUserByName) {
        return NextResponse.json({message : "Username is already taken",success:false},{status:400}) ; 
       } 
       const findUserByEmail = await userModel.findOne({email}) ; 
       const verifyCode = Math.floor(100000 + Math.random() * 900000).toString() ; 
       const verifyCodeExpiry = new Date(Date.now() + 3600000) ;

       if(findUserByEmail) {
          if(findUserByEmail.isVerified)  {
            return NextResponse.json({message : "User already registered with this email",success:false},{status:400}) ;
          }  
          const hashedPass = await bcrypt.hash(findUserByEmail.password,10) ;
          findUserByEmail.password = hashedPass  ; 
          findUserByEmail.verifyCode = verifyCode  ; 
          findUserByEmail.verifyCodeExpiry = verifyCodeExpiry  ;   
          await findUserByEmail.save() ; 
          return NextResponse.json({message : "sign-up success",status:true},{status:400}) ;
       } 
        const hashedPassword = await bcrypt.hash(password,10) ; 
      const newUser =  new userModel({
            username ,
            email ,
            password : hashedPassword , 
            verifyCode ,
            verifyCodeExpiry , 
            isVerified : false ,
            isAcceptingMessages : true,
            messages : []

        }); 
        await newUser.save() ;  
        // Send verification email 
         const emailRes =  await sendEmail({username,email,otp: verifyCode}) ; 
         if(!emailRes.success) {
            return NextResponse.json({message : emailRes.message},{status:400}) ;
         } 
           return NextResponse.json({message: "User register Successfully and OTP was send",success:true},{status:201})
        
     } catch(error) {
        console.log(error) ; 
        return NextResponse.json({message: "Error Creating User",success:false},{status:500}) ;
     }
}