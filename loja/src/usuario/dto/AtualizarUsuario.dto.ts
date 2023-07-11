import { PartialType } from '@nestjs/mapped-types';
import { CadastrarUsuarioDTO } from './CadastrarUsuario.dto';

export class AtualizarUsuarioDTO extends PartialType(CadastrarUsuarioDTO) {}
