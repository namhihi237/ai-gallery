import { Injectable } from '@nestjs/common';
import { Image } from './images.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageCreateDto } from './image.dto';
import { CloudinaryService } from '../../shared/services/cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<Image[]> {
    return this.imageModel.find();
  }

  async create(imageCreateDto: ImageCreateDto): Promise<Image> {
    return this.imageModel.create(imageCreateDto);
  }

  async generatePreSignUrl(): Promise<string> {
    return this.cloudinaryService.generatePresignedUrl();
  }
}
