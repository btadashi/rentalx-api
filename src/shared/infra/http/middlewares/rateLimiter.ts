import * as redis from 'redis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppErrors';

// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });

// const limiter = new RateLimiterRedis({
//   storeClient: redisClient,
//   keyPrefix: 'rateLimiter',
//   points: 10,
//   duration: 5,
// });

// export default async function rateLimiter(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     await limiter.consume(request.ip);

//     return next();
//   } catch (err) {
//     throw new AppError("Too many requests", 429);
//   }
// }


export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  await redisClient.connect(); // essa aqui


  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5,
    duration: 5,
  });
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError(err.message, 429);
  }
}
