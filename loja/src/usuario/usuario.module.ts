import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { EmailEhUnicoValidator } from './validacao/email-unico.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  //Referencias para Classe que o Nest.js gerencie a criacao desses objetos.
  providers: [UsuarioService, EmailEhUnicoValidator],
})
export class UsuarioModule {}
