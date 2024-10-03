import { userModel } from "@/models/UserModel";
import { dbConnect } from "@/utils/dbConnect";
import { AuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";  
import bcrypt from "bcrypt" 
import GoogleProvider from "next-auth/providers/google";

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any):Promise<any> { 
             await dbConnect() ;
             const user = await userModel.findOne({email : credentials?.email});
            if (user) {  
                const match = await bcrypt.compare(credentials?.password,user.password)
                if(!match) {
                    throw new Error("Invalid Crerdentials")
                }
              return user
            } else {
              
              throw new Error("Email not found") ;
      
            }
          }
        }) ,
        
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ] , 
     
       
      pages : {
        signIn : "/sign-in"
      } , 
      session :{
        strategy : "jwt"
      } ,
      callbacks : {
        async session({token,session}) { 
               if(token) {
                session.user._id = token?._id ;
                session.user.isAcceptingMessages = token?.isAcceptingMessages ;
                session.user.isVerified = token?.isVerified ;
                session.user.username = token?.username ;
               }
              return session ;
        } ,
        async jwt({token,user}) { 
            if(user) {
                token._id = user?._id ;
                token.isAcceptingMessages = user?.isAcceptingMessages ;
                token.isVerified = user?.isVerified ;
                token.username = user?.username ;
            }
            return token ;
        } ,  
        async signIn({user}) { 
          await dbConnect() ; 
          const googleUser = await userModel.findOne({email : user?.email}) ;  
          console.log(googleUser) ;
         if(googleUser) {
          return true ;
         }  else {
            await userModel.create({ 
              username : user?.name , 
              email : user?.email , 
              avatar : user?.image   , 
              isVerified : true 
            }) ; 
            return true ;
         }
        
          
        }

      } ,
      secret : process.env.NEXTAUTH_SECRECT! 

}