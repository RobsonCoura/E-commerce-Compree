import { PartialType } from '@nestjs/mapped-types';
import { CadastrarProdutoDTO } from './CadastrarProduto.dto';

export class AtualizaProdutoDTO extends PartialType(CadastrarProdutoDTO) {}
