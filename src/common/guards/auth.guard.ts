import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    try {
      const token = request.headers['authorization'];
      if (!token) {
        return false;
      }
      const user = await this.usersService.getUserBySession(token);
      request.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}