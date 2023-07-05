import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizarUsuarioDTO } from './dto/AtualizarUsuario.dto';
import { CadastrarUsuarioDTO } from './dto/CadastrarUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  //Construtor para o Nest.js consiga instancia de forma automatica o Objeto
  constructor(private usuarioService: UsuarioService) {}

  //Método para criar um usuário
  @Post()
  async cadastrarUsuario(@Body() dadosDoUsuario: CadastrarUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;

    this.usuarioService.criaUsuario(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      messagem: 'Usuário criado com sucesso',
    };
  }

  //Método para buscar todos usuários
  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();

    return usuariosSalvos;
  }

  //Método para atualizar um usuário
  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosParaAtualizar: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizarUsuario(
      id,
      dadosParaAtualizar,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletarUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'Usuário removido com sucesso',
    };
  }
}
