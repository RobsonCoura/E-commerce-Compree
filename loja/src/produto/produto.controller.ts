import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CadastrarProdutoDTO } from "./dto/CadastrarProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoRepository: ProdutoRepository) { }

    @Post()
    cadastrarProduto(@Body() dadosProduto: CadastrarProdutoDTO) {
        this.produtoRepository.salvar(dadosProduto);
        return dadosProduto;
    }

    @Get()
    listaTodos() {
        return this.produtoRepository.listaTodos();
    }
}