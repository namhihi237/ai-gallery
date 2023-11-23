import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
})
export class SharedModule {}
