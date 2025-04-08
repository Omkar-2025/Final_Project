import { z } from "zod";


export const billSchema = z.object({
    billName:z.string().min(3).max(50),
    amount:z.number().min(1),
    frequency:z.string(),
    accountId:z.string()
})

export const billUpdateSchema =z.object({
    billName:z.string().min(3).max(255),
    amount:z.number().min(1),
    frequency:z.enum(["weekly", "Daily", "monthly"]),
    accountId:z.string(),
    id:z.number()
})


