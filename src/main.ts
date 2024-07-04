import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from 'lib/common/pipe/validation.pipe';
import { ValidationPipeConfigs } from 'lib/common/exception/validation-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe(ValidationPipeConfigs));

  await app.listen(3000);
}
bootstrap();
