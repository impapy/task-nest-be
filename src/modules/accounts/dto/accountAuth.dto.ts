import { User, UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PASSWORD_MIN_LENGTH, PASSWORD_VALID } from 'src/constants';

export class LoginDto {
  @IsEmail({}, { message: 'INVALID_EMAIL' })
  @IsString()
  username: string;

  @MinLength(PASSWORD_MIN_LENGTH, { message: 'PASSWORD_TOO_SHORT' })
  @Matches(PASSWORD_VALID, {
    message:
      'PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character.',
  })
  password: string;
}

export class LoginResponse {
  @IsString()
  token: string;

  @ValidateNested()
  user: User;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;
}
