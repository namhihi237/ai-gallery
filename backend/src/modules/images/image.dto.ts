import { IsNotEmpty, IsOptional } from 'class-validator';

export class ImageCreateDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  tags: string[];
}
