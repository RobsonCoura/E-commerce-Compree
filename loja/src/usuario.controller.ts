import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    //Injecao de dependencia
    private usuarioRepository = new UsuarioRepository();

    //Método para cadastro de usuario
    @Post()
    async criarUsuario(@Body() dadosDoUsuario) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    //Método para consultar todos usuario
    @Get()
    async listaDeUsuarios() {
        return this.usuarioRepository.listar();
    }
}