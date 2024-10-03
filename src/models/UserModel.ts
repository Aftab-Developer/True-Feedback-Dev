import mongoose , {Schema ,Document}  from "mongoose" ;

export interface message extends Document  {
   content : string ;
   createdAt : Date ;
} 

export const messageSchema = new Schema<message>({ 
   content : {
    type : String ,
    required : true 
   } ,
   createdAt : {
    type : Date ,
    default : Date.now
   }
}) ; 

export interface User {
    username : string ;
    email : string ;
    password : string ;  
    avatar : string ;
    verifyCode : string ;
    verifyCodeExpiry : Date ;  
    isVerified : boolean ; 
    isAcceptingMessages : boolean ;
    messages : message[] ;


} ;

export const userSchema = new Schema<User>({
    username : {
        type : String,
        required : [true , "Username required"], 
        
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : false
    }, 
    avatar:{
        type:String ,
        required :false,
    } ,
    verifyCode : {
        type : String
    },
    verifyCodeExpiry : {
        type : Date
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceptingMessages : {
        type : Boolean,
        default : true
    }, 
    messages : {
        type : [messageSchema]
    }
}) ;


export const userModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchema) ;