import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { EmailEhUnicoValidator } from './validacao/email-unico.validator';

/*Um modulo é uma classe que tem o decorator @Module() que fornece metadados que o Nest,
 usa para organizar o estrutura da aplicação, nesses metadados que informamos que é o controller, 
 provider e assim por diante.*/
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  //Referencias para Classe que o Nest.js gerencie a criacao desses objetos.
  providers: [UsuarioService, EmailEhUnicoValidator],
})
export class UsuarioModule {}
