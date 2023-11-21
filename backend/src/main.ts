import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log(`MongoDB URI: ${configService.get('MONGODB_URI')}`);

  await app.listen(process.env.PORT || 3000);

  console.log(`Listening on port ${await app.getUrl()}`);
  console.log(`MongoDB URI: ${configService.get('MONGODB_URI')}`);
}
bootstrap();
