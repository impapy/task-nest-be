import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AccountsService } from '../accounts/services/accounts.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AccountsService],
  exports: [UsersService],
})
export class UsersModule {}
