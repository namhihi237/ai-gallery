import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Image>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_At' } })
export class Image {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop([String])
  tags: string[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);
