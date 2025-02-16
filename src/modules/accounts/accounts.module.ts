import { Module } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { AuthsService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthsController } from './controllers/auth.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AuthsController],
  providers: [AccountsService, AuthsService],
})
export class AccountsModule {}
