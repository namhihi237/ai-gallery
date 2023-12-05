import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { GoogleService } from '../../shared/services/google.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  providers: [AuthService, UserService, JwtService, GoogleService],
  controllers: [AuthController],
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
  ],
})
export class AuthModule {}
