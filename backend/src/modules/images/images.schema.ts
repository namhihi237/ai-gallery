import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
