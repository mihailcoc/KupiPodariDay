import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { SaveUser } from 'src/users/entities/SaveUserEntity';

export const saveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SaveUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
