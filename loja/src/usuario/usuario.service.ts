import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDTO } from './dto/AtualizarUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  //Método para criar um usuário
  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  //Método para buscar uma lista de usuários
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  //Método para atualizar um usuário
  async atualizarUsuario(id: string, novosDados: AtualizarUsuarioDTO) {
    await this.usuarioRepository.update(id, novosDados);
  }

  //Método para deletar um usuário
  async deletarUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }

  //Método para verificar antes de cadastrar se já existe esse e-mail na base de dados
  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }
}
