import { UserType } from '@prisma/client';
import { IsString } from 'class-validator';
import { Request } from 'express';
export enum TokenType {
  ACCESS = 'ACCESS',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export class TextLangObject {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}

export class TextLangObjectRequired {
  @IsString()
  en?: string;

  @IsString()
  ar?: string;
}

export type Payload = {
  username: string;
  user: string;
  userType: UserType;
  isSuperAdmin: boolean;
  type: TokenType;
};
export type LangType = keyof TextLangObject;

export class Context {
  req: Request;

  token?: string;

  payload?: Payload;

  isAdmin: boolean;

  isUser: boolean;

  requestId: string;

  lang: LangType;
}
