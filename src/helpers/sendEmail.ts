
import nodemailer from "nodemailer"

export async function sendEmail({username , email , otp} : {username :string,email : string ,otp : string}) {
   try {
    const transporter = nodemailer.createTransport({
        service : "gmail" , 
        port : 465 , 
        secure : true , 
        auth : {
            user :"aftab785ahmed@gmail.com" , 
            pass : "mrmj bzmw qozs eeer"
        }
    }) ; 

    await transporter.sendMail({ 
        from : "aftab785ahmed@gmail.com" ,
        to : email , 
        subject : "Account verifivation" , 
        text : `Hellow dear user ${username} your account verifivation code is ${otp}`
    }) ;  
    return {success : true , message : "Email send"}
   } catch (error) {
      return {success : false , message : "Email not send"}
   }
    
}