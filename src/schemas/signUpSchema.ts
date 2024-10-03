import {z} from "zod" ;

export const usernameSchema = z.
string(). 
max(7, "7 char , include (-) and (_) not space ").
min(4, "username at least 4 charactors ")


export const signUpSchema = z.object({
    username : usernameSchema ,
    email : z.string().email({message : "Please enter valid email"}) ,
    password : z.string().min(8, "password should be at least 8 characters long")

})