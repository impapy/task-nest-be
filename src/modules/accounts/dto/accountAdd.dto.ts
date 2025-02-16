import { UserType } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountAddDto {
  @IsMongoId()
  user: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isConfirmed?: boolean;
}
