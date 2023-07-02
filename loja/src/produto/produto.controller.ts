import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CadastrarProdutoDTO } from "./dto/CadastrarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from "crypto";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoRepository: ProdutoRepository) { }

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

        const produtoCadastrado = this.produtoRepository.salvarUmProduto(produto);
        return produtoCadastrado;
    }

    //Método para buscar todos produtos
    @Get()
    async listaTodosProdutos() {
        return this.produtoRepository.listaTodosProdutos();
    }

    //Método para atualizar um produto
    @Put('/:id')
    async atualizarUmProduto(
        @Param('id') id: string,
        @Body() dadosProduto: AtualizarProdutoDTO,
    ) {
        const produtoAlterado = await this.produtoRepository.atualizarUmProduto(
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
      const produtoRemovido = await this.produtoRepository.deletarUmProduto(id);
  
      return {
        mensagem: 'produto removido com sucesso',
        produto: produtoRemovido,
      };
    }
}