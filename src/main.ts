import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptions/response-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The users API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    // should be in development mode only
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        // Display request duration in swagger UI
        displayRequestDuration: true,
      },
    });
  }

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port : 3000`);
  });
}
bootstrap();
