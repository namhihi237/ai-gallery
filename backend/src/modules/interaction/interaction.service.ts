import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './like.schema';

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(Like.name)
    private likeModel: Model<Like>,
  ) {}
  async like(imageID: string, userID: string) {
    const liked = await this.likeModel.findOne({
      imageID: new Types.ObjectId(imageID),
      userID,
    });

    if (liked) return;

    return this.likeModel.create({
      imageID: new Types.ObjectId(imageID),
      userID,
    });
  }

  async getLiked(imageIds: string[], userID: string) {
    return this.likeModel.find({ userID, imageID: { $in: imageIds } });
  }
}
