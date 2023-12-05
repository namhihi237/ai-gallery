import { Injectable } from '@nestjs/common';
import { LoginGoogleDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleService } from '../../shared/services/google.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private googleService: GoogleService,
  ) {}
  async loginWithGoogle(loginGoogleDto: LoginGoogleDto) {
    const { name, email, picture } = await this.googleService.verifyToken(loginGoogleDto.token);

    const user = await this.userService.createUser({ email, name, image: picture });
    const accessToken = this.jwtService.sign(
      { email, _id: user._id },
      { secret: process.env.JWT_SECRET },
    );
    return {
      user,
      accessToken,
    };
  }
}
