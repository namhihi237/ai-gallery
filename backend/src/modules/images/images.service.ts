import { Injectable } from '@nestjs/common';
import { Image } from './images.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async findAll(): Promise<Image[]> {
    return this.imageModel.find();
  }
}
