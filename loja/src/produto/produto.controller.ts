import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/AtualizarProduto.dto';
import { CadastrarProdutoDTO } from './dto/CadastrarProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(
    // private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService,
  ) {}

  //Método para cadastrar um produto passando id de um usuário cadastrado
  @Post()
  async criarNovoProduto(@Body() dadosProduto: CadastrarProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidadeDisponivel;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    const produtoCadastrado = this.produtoService.criaProduto(produto);
    return produtoCadastrado;
  }

  //Método para buscar todos produtos
  @Get()
  async listaTodosProdutos() {
    return this.produtoService.listProdutos();
  }

  //Método para atualizar um produto
  @Put('/:id')
  async atualizarUmProduto(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizarProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async deletarUmProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
