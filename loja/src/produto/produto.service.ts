import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}
  //Método para cadastrar um produto
  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }
  //Método para trazer uma lista de produtos
  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }
  //Método para atualizar um produto
  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(entityName, novosDados as ProdutoEntity);

    return this.produtoRepository.save(entityName);
  }
  //Método para excluir um produto
  async deletaProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }
}
