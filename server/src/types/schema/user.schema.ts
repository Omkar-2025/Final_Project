import {z} from 'zod';


export const userSchema = z.object({
    name:z.string().min(3).max(255),
    email:z.string().email(),
    password:z.string().min(6).max(12),
    phone:z.string().min(10).max(10),
})

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6).max(12)
})

export const updateUserSchema = z.object({
    name:z.string().min(3).max(50).optional(),
    email:z.string().email().optional(),
    phone:z.string().min(10).max(10).optional(),
    address:z.string().optional()
})

export const updatePasswordSchema = z.object({
    oldPassword:z.string().min(6).max(12),
    newPassword:z.string().min(6).max(12)
})