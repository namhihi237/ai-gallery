import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());

  const configService = app.get(ConfigService);
  await app.listen(process.env.PORT || 3000);

  console.log(`Listening on port ${await app.getUrl()}`);
  console.log(`MongoDB URI: ${configService.get('MONGODB_URI')}`);
}
bootstrap();
