import { Body, Controller, Post } from '@nestjs/common';
import { AuthsService } from '../services/auth.service';
import { LoginDto, LoginResponse } from '../dto/accountAuth.dto';

@Controller('auth')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('login')
  async logIn(@Body() input: LoginDto): Promise<LoginResponse> {
    return await this.authsService.logIn(input);
  }
}
