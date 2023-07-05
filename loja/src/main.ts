import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Quando executar esse pipe ele tranforma o Json no CriarUsuarioDTO
      transform: true,
      //Ignora todas as propriedades que vinher no Json que nao estiver no DTO.
      whitelist: true,
      //Lancar um erro quando o cliente manda uma requisicao que nao estiver no DTO.
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
