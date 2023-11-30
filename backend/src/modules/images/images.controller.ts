import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImageCreateDto } from './image.dto';

@Controller('api/images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  @HttpCode(200)
  async getImages() {
    return this.imageService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() imageCreateDto: ImageCreateDto) {
    return this.imageService.create(imageCreateDto);
  }

  @Get('presigned')
  @HttpCode(200)
  async getPreSignURL(): Promise<{ url: string }> {
    const url = await this.imageService.generatePreSignUrl();
    return { url };
  }
}
