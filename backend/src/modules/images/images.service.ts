import { Injectable } from '@nestjs/common';
import { Image } from './images.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageCreateDto, OrderBy, PagingDto } from './image.dto';
import { CloudinaryService } from '../../shared/services/cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(paging: PagingDto) {
    const { page = 1, limit = 10, sortBy, orderBy = OrderBy.desc } = paging;

    const where = {};
    const sort = {};
    if (sortBy) {
      sort[sortBy] = orderBy === OrderBy.asc ? 1 : -1;
    } else {
      sort['createdAt'] = -1;
    }

    const images = await this.imageModel
      .find(where, { __v: 0, updated_At: 0 })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.imageModel.countDocuments(where);

    return {
      total,
      images,
    };
  }

  async create(imageCreateDto: ImageCreateDto, file: Express.Multer.File): Promise<Image> {
    const url = await this.cloudinaryService.uploadFile(file);
    console.log(url);

    return this.imageModel.create({ ...imageCreateDto, url });
  }

  async generatePreSignUrl() {
    return this.cloudinaryService.generatePresignedUrl();
  }
}
