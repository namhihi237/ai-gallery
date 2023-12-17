import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from './config/config.module';
import { ImagesModule } from './modules/images/images.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { InteractionModule } from './modules/interaction/interaction.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ImagesModule, SharedModule, AuthModule, UserModule, InteractionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
