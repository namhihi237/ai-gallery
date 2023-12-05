import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGoogleDto } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async loginWithGoogle(@Body() loginGoogleDto: LoginGoogleDto) {
    return this.authService.loginWithGoogle(loginGoogleDto);
  }
}
