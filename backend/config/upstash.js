//For rate limiting, and controlling the rate limtis

import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dontenv from "dotenv";
dontenv.config();


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"), // 100 requests per minute
});

export default ratelimit;

