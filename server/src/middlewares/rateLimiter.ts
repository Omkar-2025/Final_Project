import { rateLimit  } from 'express-rate-limit'; 

/**
 * This middleware is used to limit the number of requests from a single IP address
 */


const rateLimiter = rateLimit({
    windowMs:60*1000, 
    max:5, 
    message:"Too many requests from this IP, please try again later",
})

export default rateLimiter;