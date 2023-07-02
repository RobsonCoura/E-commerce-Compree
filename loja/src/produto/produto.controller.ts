import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CadastrarProdutoDTO } from "./dto/CadastrarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from "crypto";

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
}