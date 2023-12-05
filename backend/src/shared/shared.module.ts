import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { ConfigModule } from '../config/config.module';
import { GoogleService } from './services/google.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, GoogleService],
})
export class SharedModule {}
