import { z } from "zod";

export const resolveQuerySchema = z.object({
    queryId: z.number().int("ID must be an integer").positive("ID must be a positive number"),
    reply: z.string().min(1, "Reply cannot be empty").max(1000, "Reply cannot exceed 1000 characters"),
});

export type ResolveQueryType = z.infer<typeof resolveQuerySchema>;