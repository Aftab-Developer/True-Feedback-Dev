import {z} from "zod" ;


export const messageSchema = z.object({
    content : z.string().min(20,"enter at least 20 charactors").max(120,"enter at under 120 charactors")
})