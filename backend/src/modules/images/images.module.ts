import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageSchema, Image } from './images.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { CloudinaryService } from '../../shared/services/cloudinary/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]), SharedModule],
  providers: [ImagesService, CloudinaryService],
  controllers: [ImagesController],
})
export class ImagesModule {}
