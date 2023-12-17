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
    const liked = await this.likeModel.findOne({
      imageID,
      userID,
    });

    if (liked) return;

    return this.likeModel.create({
      imageID,
      userID,
    });
  }
}
