import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImageCreateDto, PagingDto } from './image.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express/multer';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

@Controller('api/images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  @HttpCode(200)
  async getImages(@Query() paging: PagingDto) {
    return this.imageService.findAll(paging);
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() imageCreateDto: ImageCreateDto) {
    console.log(imageCreateDto);

    return this.imageService.create(imageCreateDto, file);
  }

  @Get('presigned')
  @HttpCode(200)
  async getPreSignURL() {
    return this.imageService.generatePreSignUrl();
  }
}
