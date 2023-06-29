import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";

@Module({
    controllers: [UsuarioController],
    //Referencias para Classe que o Nest.js gerencie a criacao desses objetos.
    providers: [UsuarioRepository]
})
export class UsuarioModule {}