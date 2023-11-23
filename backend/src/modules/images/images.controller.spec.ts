import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { getModelToken } from '@nestjs/mongoose';
import { Image } from './images.schema';
import { Types } from 'mongoose';
import { ImageCreateDto } from './image.dto';

describe('ImagesController', () => {
  let controller: ImagesController;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        ImagesService,
        {
          provide: getModelToken(Image.name),
          useValue: {
            /* mock the necessary methods of Model */
          },
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getImages', () => {
    it('should return all images', async () => {
      const mockImages = [
        { url: 'image1.jpg', tags: ['tag1', 'tag2'] },
        { url: 'image2.jpg', tags: ['tag3', 'tag4'] },
      ];

      jest.spyOn(imagesService, 'findAll').mockResolvedValue(mockImages);

      const result = await controller.getImages();

      expect(result).toEqual(mockImages);
      // Ensure that the imagesService.findAll method was called
      expect(imagesService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should return new image', async () => {
      const createDto: ImageCreateDto = {
        url: 'image1.jpg',
        tags: ['tag1', 'tag2'],
      };

      const mockImage = {
        _id: new Types.ObjectId(),
        ...createDto,
      };

      jest.spyOn(imagesService, 'create').mockResolvedValue(mockImage);
      const result = await controller.create(createDto);

      expect(result).toEqual(mockImage);
      expect(imagesService.create).toHaveBeenCalled();
    });
  });
});
