import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Payload } from '../dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!roles) return true;
    const payload = request['context'].payload as Payload;
    if (!payload) return false;
    if (!roles.includes(payload.userType)) {
      return false;
    }
    return true;
  }
}
