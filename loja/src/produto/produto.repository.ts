import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository {
    
    private produtos = [];

    //Método para consultar todos produtos
    listaTodos() {
        return this.produtos;
    }

    //Método para cadastrar um produto
    salvar(dadosProduto) {
        this.produtos.push(dadosProduto);
    }
}