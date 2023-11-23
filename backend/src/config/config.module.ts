import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { cloudinaryConfig } from './cloudinary.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [cloudinaryConfig],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
