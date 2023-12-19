import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuardOptional implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    return this.authService.validateOptional(context);
  }
}
