import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { Like, LikeSchema } from './like.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleService } from '../../shared/services/google.service';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [InteractionService, AuthService, UserService, JwtService, GoogleService],
  controllers: [InteractionController],
})
export class InteractionModule {}
