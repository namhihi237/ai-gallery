import { IsNotEmpty, IsOptional } from 'class-validator';

export class ImageCreateDto {
  @IsNotEmpty()
  url: string;

  @IsOptional()
  tags: string[];
}
