import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import { Context, LangType, Payload, TokenType } from './common/dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './common/database/prisma.service';
import { UserType } from '@prisma/client';

@Injectable()
export class ContextService implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async use(req: Request, res: Response, next: NextFunction) {
    const context: Context = {
      lang: (req?.headers?.['lang'] ||
        req?.headers?.['accept-language'] ||
        'en') as LangType,
      req,
      requestId: uuidv4(),
      isAdmin: false,
      isUser: false,
    };

    const tokenHeader = req?.headers?.authorization;
    if (tokenHeader) {
      const token = tokenHeader.split(' ')[1];
      if (token) {
        try {
          const data = decode(token) as Payload;

          // Find user with Prisma
          const user = await this.prisma.account.findUnique({
            where: { username: data?.username },
          });

          if (!user) throw new UnauthorizedException();

          const payload = verify(
            token,
            `${process.env.JWT_SECRET}${user.userSigningKey}`,
          ) as Payload;

          if (payload && data?.type === TokenType.ACCESS) {
            context.isAdmin = user.userType === UserType.ADMIN;
            context.isUser = user.userType === UserType.USER;
            context.payload = { ...payload, user: user.id }; // Prisma uses strings for MongoDB IDs
          }
        } catch (e) {
          throw new UnauthorizedException();
        }
      }
    }

    req['context'] = context; // Attach context to the request object
    next();
  }
}
