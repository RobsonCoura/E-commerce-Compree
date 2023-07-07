import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizarUsuarioDTO } from './dto/AtualizarUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { CadastrarUsuarioDTO } from './dto/CadastrarUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  //Construtor para o Nest.js consiga instancia de forma automatica o Objeto
  constructor(private usuarioService: UsuarioService) {}

  //Método para criar um usuário
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CadastrarUsuarioDTO) {
    const usuarioCriado = await this.usuarioService.criaUsuario(dadosDoUsuario);

    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
      messagem: 'usuário criado com sucesso',
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
