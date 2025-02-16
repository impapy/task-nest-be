import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { LoginDto, LoginResponse } from '../dto/accountAuth.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { CustomErrorException } from 'src/common/errorHandling/costomError';
import { TokenType } from 'src/common/dto';

@Injectable()
export class AuthsService {
  constructor(private readonly prisma: PrismaService) {}

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  static async comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }

  static async signToken(
    payload: Record<string, string>,
    userSigningKey: string,
  ): Promise<string> {
    const keysMix = `${process.env.JWT_SECRET}${userSigningKey}`;
    return sign(payload, keysMix);
  }

  async logIn(loginInput: LoginDto): Promise<LoginResponse> {
    const account = await this.prisma.account.findUnique({
      where: { username: loginInput.username },
      include: { user: true }, // Ensure user details are fetched
    });

    if (!account) {
      throw new CustomErrorException('NOT_FOUND', 404);
    }

    if (!account.isConfirmed) {
      throw new CustomErrorException('ACCOUNT_NOT_CONFIRMED');
    }

    const isMatches = await AuthsService.comparePasswords(
      loginInput.password,
      account.password,
    );

    if (!isMatches) {
      throw new CustomErrorException('INCORRECT_CREDENTIALS', 404);
    }

    const token = await AuthsService.signToken(
      {
        user: account.userId,
        username: account.username,
        type: TokenType.ACCESS,
        userSigningKey: account.userSigningKey,
        userType: account.userType,
      },
      account.userSigningKey,
    );

    return {
      token,
      userType: account.userType,
      user: account.user, // Directly returning user object from Prisma
    };
  }
}
