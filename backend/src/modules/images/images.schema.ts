import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Image>;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Image {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop([String])
  tags: string[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);
