import {z} from "zod"; 


export const signInSchema = z.object({
    email : z.string().email({message : "please enter valid email address"}),
    password : z.string().min(8 ,{message:"enter valid password"})
}) ;