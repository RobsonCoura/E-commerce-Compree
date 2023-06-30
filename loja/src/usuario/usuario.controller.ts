import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { CadastrarUsuarioDTO } from "./dto/CadastrarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";



@Controller('/usuarios')
export class UsuarioController {

  //Construtor para o Nest.js consiga instancia de forma automatica o Objeto
  constructor(private usuarioRepository: UsuarioRepository) {

  }

  //Método para cadastro de usuario
  @Post()
  async cadastrarUsuario(@Body() dadosDoUsuario: CadastrarUsuarioDTO) {

    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      messagem: 'Usuário criado com sucesso',
    };
  }

  //Método para consultar todos usuario
  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  //Método para atualizar um usuario
  @Put('/:id')
  async atualizarusuario(@Param('id') id: string, @Body() dadosParaAtualizar: AtualizarUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualizar(id, dadosParaAtualizar);

    return {
      usuario: usuarioAtualizado,
      messagem: 'Usuário atualizado com sucesso',
    }
  }

}