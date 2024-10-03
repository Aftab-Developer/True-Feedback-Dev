
import mongoose, { connection } from "mongoose"; 
interface connection {
    isConnected?: number;
} 

const connectionObj:connection = {} ;

export async function dbConnect() : Promise<void> {
    try { 
        if(connectionObj.isConnected) {
            console.log("Already connected to MongoDB") ;
            return ; 
        } 
      await mongoose.connect(process.env.MONGODB_URI! ) ; 
        connectionObj.isConnected = mongoose.connections[0].readyState ;
    } 
     catch(error) {
    console.error("falied to connect to MongoDB",error) ; 
    process.exit(1) ;
    }
}