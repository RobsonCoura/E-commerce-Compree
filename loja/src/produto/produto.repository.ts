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

    //Método para verificar se já existe id cadastrado na base de dados
    private buscaPorId(id: string) {
        const possivelProduto = this.produtos.find((produto) => produto.id === id);

        if (!possivelProduto) {
            throw new Error('Produto não existe');
        }

        return possivelProduto;
    }

    //Método para atualizar um produto
    async atualizarUmProduto(id: string, dadosProduto: Partial<ProdutoEntity>) {
        const dadosNaoAtualizaveis = ['id', 'usuarioId'];
        const produto = this.buscaPorId(id);
        Object.entries(dadosProduto).forEach(([chave, valor]) => {
            if (dadosNaoAtualizaveis.includes(chave)) {
                return;
            }
            produto[chave] = valor;
        });

        return produto;
    }
}