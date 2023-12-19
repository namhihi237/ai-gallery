import { Injectable } from '@nestjs/common';
import { Image } from './images.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageCreateDto, OrderBy, PagingDto } from './image.dto';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { InteractionService } from '../interaction/interaction.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<Image>,
    private cloudinaryService: CloudinaryService,
    private interactionService: InteractionService,
  ) {}

  async findAll(paging: PagingDto, userID: string) {
    const { page = 1, limit = 10, sortBy, orderBy = OrderBy.desc } = paging;

    const where = {};
    const sort = {};
    if (sortBy) {
      sort[sortBy] = orderBy === OrderBy.asc ? 1 : -1;
    } else {
      sort['createdAt'] = -1;
    }

    let images = await this.imageModel
      .find(where, { __v: 0, updatedAt: 0 })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await this.imageModel.countDocuments(where);
    if (userID && images.length) {
      const imageIds = images.map((image) => image._id);
      images = JSON.parse(JSON.stringify(images));

      const likedImages = await this.interactionService.getLiked(imageIds, userID);

      const likedImageMap = new Map(
        JSON.parse(JSON.stringify(likedImages)).map((likedImage) => [likedImage.imageID, true]),
      );

      images = images.map((image) => ({
        ...image,
        isLike: likedImageMap.has(image._id),
      }));
    }

    return {
      total,
      images,
    };
  }

  async create(
    imageCreateDto: ImageCreateDto,
    file: Express.Multer.File,
    userID: string,
  ): Promise<Image> {
    const url = await this.cloudinaryService.uploadFile(file);
    return this.imageModel.create({ ...imageCreateDto, url, userID });
  }

  async generatePreSignUrl() {
    return this.cloudinaryService.generatePresignedUrl();
  }
}
