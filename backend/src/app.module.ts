import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from './config/config.module';
import { ImagesModule } from './modules/images/images.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ImagesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
