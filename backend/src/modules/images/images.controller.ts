import { Controller, Get, HttpCode } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  @HttpCode(200)
  async getImages() {
    return this.imageService.findAll();
  }
}
