import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUrl,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';
import {
  NAME,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_VALID,
} from 'src/constants';

export class UserAddDto {
  @IsOptional()
  @IsUrl({}, { message: 'INVALID_URL' })
  image?: string;

  @MinLength(NAME_MIN_LENGTH, { message: 'NAME_TOO_SHORT' })
  @Matches(NAME, {
    message: 'minimum of 3 alphabetic characters.',
  })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'INVALID_EMAIL' })
  email: string;

  @MinLength(PASSWORD_MIN_LENGTH, { message: 'PASSWORD_TOO_SHORT' })
  @Matches(PASSWORD_VALID, {
    message:
      'PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character.',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
