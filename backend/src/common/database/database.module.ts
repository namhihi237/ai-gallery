import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/config.module';
console.log(process.env.MONGODB_URI);

@Module({
  imports: [ConfigModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
})
export class DatabaseModule {}
