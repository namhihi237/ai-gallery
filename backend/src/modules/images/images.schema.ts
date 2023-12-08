import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Image extends Document {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userID: Types.ObjectId | User;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
