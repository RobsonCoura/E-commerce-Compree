import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';

/*A camada de controller é responsável por receber as requisições HTTP,
 e direcioná-las aos serviços adequados*/
@Controller('produtos')
export class ProdutoController {
  constructor(
    // private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService,
  ) {}

  //Método para cadastrar um produto passando id de um usuário cadastrado
  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(
      dadosProduto,
    );

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
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
    const produtoAlterado = await this.produtoService.atualizaProduto(
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
