import { rateLimit  } from 'express-rate-limit'; 


const rateLimiter = rateLimit({
    windowMs:60*1000, 
    max:5, 
    message:"Too many requests from this IP, please try again later",
})

export default rateLimiter;