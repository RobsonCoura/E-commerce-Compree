import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
    
    private produtos: ProdutoEntity[] = [];

    //Método para consultar todos produtos
    listaTodosProdutos() {
        return this.produtos;
    }

    //Método para cadastrar um produto
    salvarUmProduto(dadosProduto) {
        this.produtos.push(dadosProduto);
        return dadosProduto;
    }
}