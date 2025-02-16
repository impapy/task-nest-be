import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAddDto } from '../dto/userAdd.dto';
import { omit } from 'ramda';
import { PrismaService } from 'src/common/database/prisma.service';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { CustomErrorException } from 'src/common/errorHandling/costomError';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private accountsService: AccountsService,
  ) {}

  async userAdd(userAddDto: UserAddDto): Promise<User> {
    const possibleUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: userAddDto.email }],
      },
    });

    if (possibleUser) throw new ConflictException('User Exist');

    // Create user without password
    const userArgs = omit(['password'], userAddDto);
    const user = await this.prisma.user.create({
      data: { ...userArgs },
    });

    if (!user)
      throw new CustomErrorException(
        'ERROR_WHILE_CREATING_USER',
        HttpStatus.BAD_REQUEST,
        'en',
      );

    // Create user account
    await this.accountsService.add({
      user: user.id, // Use Prisma's `id`
      username: userAddDto.email,
      password: userAddDto.password,
      userType: user.userType,
      email: userAddDto.email,
    });

    return user;
  }
}
