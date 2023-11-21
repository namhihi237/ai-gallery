import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Image } from './images.schema';
describe('ImagesService', () => {
  let service: ImagesService;
  let imageModel: Model<Image>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: getModelToken(Image.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    imageModel = module.get<Model<Image>>(getModelToken(Image.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all images', async () => {
      const mockImages: Image[] = [
        { url: 'image1.jpg', tags: ['tag1', 'tag2'] },
        { url: 'image2.jpg', tags: ['tag3', 'tag4'] },
      ];

      jest.spyOn(imageModel, 'find').mockResolvedValue(mockImages);

      const result = await service.findAll();

      expect(result).toEqual(mockImages);
      expect(imageModel.find).toHaveBeenCalledWith();
    });
  });
});
