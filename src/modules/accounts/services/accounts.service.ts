import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { genSalt, hash } from 'bcryptjs';
import { Account } from '@prisma/client';
import { AccountAddDto } from '../dto/accountAdd.dto';
import { CustomErrorException } from 'src/common/errorHandling/costomError';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  async add({
    user,
    userType,
    username,
    password,
    email,
  }: AccountAddDto): Promise<Account> {
    if (!username) throw new CustomErrorException('USERNAME_REQUIRED', 404);

    const salt = await genSalt();
    const hashedPassword = await AccountsService.hashPassword(password);
    const now = new Date();

    return await this.prisma.account.create({
      data: {
        userId: user,
        userType,
        password: hashedPassword,
        username,
        email,
        userSigningKey: salt,
      },
    });
  }
}
