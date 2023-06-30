import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriarUsuarioDTO } from "./dto/CrirUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    //Construtor para o Nest.js consiga instancia de forma automatica o Objeto
    constructor(private usuarioRepository: UsuarioRepository) {

    }

    //Método para cadastro de usuario
    @Post()
    async criarUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    //Método para consultar todos usuario
    @Get()
    async listaDeUsuarios() {
        return this.usuarioRepository.listar();
    }
}