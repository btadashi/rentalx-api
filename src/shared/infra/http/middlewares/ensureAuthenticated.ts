import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppErrors';


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '6d275dca2b0c13d30669dfb94ad58c48') as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Token is invalid", 401);
  }
}
