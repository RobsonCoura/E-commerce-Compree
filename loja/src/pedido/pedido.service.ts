import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProdutoEntity } from '../produto/produto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { StatusPedido } from './enum/statuspedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { PedidoEntity } from './pedido.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  //Método para cadastrar um pedido utilizando id de um usuário cadastrado no banco
  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
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

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      //Fazer a busca do produto relacionado ao itemId
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado;
      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
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
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }
 //Método para atualizar um pedido utilizando id de um usuário cadastrado no banco
  async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }
}
