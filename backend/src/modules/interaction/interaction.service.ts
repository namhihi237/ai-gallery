import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './like.schema';

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(Like.name)
    private likeModel: Model<Like>,
  ) {}
  async like(imageID: string, userID: string) {
    return this.likeModel.create({
      imageID,
      userID,
    });
  }
}
