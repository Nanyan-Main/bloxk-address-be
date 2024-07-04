import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from 'lib/common/pipe/validation.pipe';
import { ValidationPipeConfigs } from 'lib/common/exception/validation-exception-factory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { confDoc } from 'lib/swagger/conf.doc';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: isProduction ? '' : '*',
  });
  app.useGlobalPipes(new CustomValidationPipe(ValidationPipeConfigs));

  const config = new DocumentBuilder()
    .setTitle(confDoc.title)
    .setDescription(confDoc.description)
    .setVersion(confDoc.version)
    .addBearerAuth(confDoc.bearerAuth, confDoc.securityName)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(confDoc.endpoint, app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
