import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { useSwagger } from './common/swagger/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('.'))

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  useSwagger(app)
  await app.listen(8080);
}
bootstrap();
