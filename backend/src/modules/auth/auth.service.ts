import {
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async validate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.validateToken(req);

    if (!user) {
      return false;
    }
    req.user = user;
    return true;
  }

  async validateOptional(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.validateTokenOptional(req);

    req.user = user;
    return true;
  }

  private async validateTokenOptional(req: Request) {
    try {
      const token = this.getToken(req);
      let userId = '';

      const checkJwt = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      userId = checkJwt._id ? checkJwt._id : null;
      if (userId) {
        const user = await this.userService.findById(userId);
        return user;
      }
    } catch (error) {
      return null;
    }
  }

  private async validateToken(req: Request) {
    let userId = '';
    const token = this.getToken(req);

    try {
      const checkJwt = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      userId = checkJwt._id ? checkJwt._id : null;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    if (userId) {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      return user;
    }
    return null;
  }

  private getToken(req: Request) {
    const authorization = req.headers['authorization'] || req.headers['Authorization'];

    let token = '';
    if (authorization && authorization.startsWith('Bearer')) {
      const split = authorization.split('Bearer ');
      if (split.length !== 2) {
        throw new UnauthorizedException();
      }
      token = split[1];
    }

    return token;
  }
}
