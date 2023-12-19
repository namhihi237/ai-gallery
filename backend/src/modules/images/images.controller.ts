import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImageCreateDto, PagingDto } from './image.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { User } from '../user/user.schema';
import { InteractionService } from '../interaction/interaction.service';
import { AuthGuardOptional } from '../../guards/auth-optional.guard';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

@Controller('api/images')
export class ImagesController {
  constructor(
    private imageService: ImagesService,
    private interactionService: InteractionService,
  ) {}

  @Get()
  @UseGuards(AuthGuardOptional)
  @HttpCode(200)
  async getImages(@Query() paging: PagingDto) {
    return this.imageService.findAll(paging);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async create(
    @CurrentUser() currentUser: User & { _id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() imageCreateDto: ImageCreateDto,
  ) {
    return this.imageService.create(imageCreateDto, file, currentUser._id);
  }

  @UseGuards(AuthGuard)
  @Get('presigned')
  @HttpCode(200)
  async getPreSignURL() {
    return this.imageService.generatePreSignUrl();
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  @HttpCode(201)
  async like(@CurrentUser() currentUser: User & { _id: string }, @Param() id: string) {
    return this.interactionService.like(id, currentUser._id);
  }
}
