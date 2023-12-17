import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';
import { Image } from '../images/images.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Image' })
  imageID: Types.ObjectId | Image;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userID: Types.ObjectId | User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
