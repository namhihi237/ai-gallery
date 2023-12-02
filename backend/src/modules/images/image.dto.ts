import { IsNotEmpty, IsOptional } from 'class-validator';

export class ImageCreateDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  tags: string[];
}

export class PagingDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  sortBy: SortBy;

  @IsOptional()
  orderBy: OrderBy;
}

enum SortBy {
  created_at = 'createdAt',
}

export enum OrderBy {
  asc = 1,
  desc = -1,
}
