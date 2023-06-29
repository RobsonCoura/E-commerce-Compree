import { Module } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoController } from "./produto.controller";
import { UsuarioModule } from "src/usuario/usuario.module";

@Module({
    imports: [UsuarioModule],
    controllers: [ProdutoController],
    //Referencias para Classe que o Nest.js gerencie a criacao desses objetos.
    providers: [ProdutoRepository],
})
export class ProdutoModule { }