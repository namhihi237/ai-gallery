import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Image' })
  imageID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userID: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
