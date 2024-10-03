import {z} from "zod" ;

export const verifyCodeSchema = z.object({
    verifyCode : z.string().min(6,"enter at least 6 digits").max(6,"enter at most 6 digits")
})


