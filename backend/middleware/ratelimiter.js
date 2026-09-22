import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try{
        const {success} = await ratelimit.limit('my-limit-key')//userid instead of my-limit-key if it is a logged in user and authentication is setup or else use ip address
           
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later."})
        }

        next();
    }
    catch (error) {
       console.log("Error in rateLimiter:", error);

       next(error);
    }
}

export default rateLimiter;