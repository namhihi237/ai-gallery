import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageSchema, Image } from './images.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleService } from '../../shared/services/google.service';
import { User, UserSchema } from '../user/user.schema';
import { InteractionService } from '../interaction/interaction.service';
import { Like, LikeSchema } from '../interaction/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    SharedModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    ImagesService,
    CloudinaryService,
    AuthService,
    UserService,
    JwtService,
    GoogleService,
    InteractionService,
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
