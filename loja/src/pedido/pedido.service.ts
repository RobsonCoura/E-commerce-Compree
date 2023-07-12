import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProdutoEntity } from '../produto/produto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { StatusPedido } from './enum/statuspedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { PedidoEntity } from './pedido.entity';

//A camada de service é responsável por conter a lógica e regras de negócios de nossa API
@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  //Método para fazer busca de usuario
  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    //Conferencia se Id de usuario existe no banco
    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }
    return usuario;
  }

  //
  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      //Conferencia se o produto com Id ItemPedido existe
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }
      //Conferencia se usuario colocou uma quantidade de itemPedido maior do que tem disponivel
      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponivel (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  //Método para cadastrar um pedido utilizando id de um usuário cadastrado no banco
  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    //Conferencia se o Id que solicitou a requisicao está na lista de produtosIds
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      //Fazer a busca do produto relacionado ao itemId
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      //Processamento fazendo uma subtracao via cascade na tabela de produtos
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });
    //Trazer o valor total
    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);
    //Criando os itensPedidos automaticamente por conta da anotacao cascade(true) na PedidoEntity
    pedidoEntity.itensPedido = itensPedidoEntidades;

    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  //Método que retorna uma lista de pedidos relacionados ao usuário especificado pelo usuarioId
  async obtemPedidosDeUsuario(usuarioId: string) {
    const usuario = await this.buscaUsuario(usuarioId);

    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  // Método para atualizar um pedido utilizando id de um usuário cadastrado no banco
  async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });
    // throw new Error('Simulacão erro de banco de dados!');

    // Conferencia se Id de pedido existe no banco
    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
    Object.assign(pedido, dto as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }

  //Método para excluir um produto
  async deletaPedido(id: string) {
    const resultado = await this.pedidoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
  }
}
