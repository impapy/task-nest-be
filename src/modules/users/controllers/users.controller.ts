import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@prisma/client';
import { UserAddDto } from '../dto/userAdd.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async userAdd(@Body() input: UserAddDto): Promise<User> {
    return await this.usersService.userAdd(input);
  }
}
