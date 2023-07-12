import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';

//Entity representa a estrutura de dados do objeto
@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  //Criando relacionamento que varios pedidos possui um usuario N:1
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity;

  //Criando relacionamento que varios itens_pedidos possui um pedido N:1
  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
    cascade: true,
    eager: true,
  })
  itensPedido: ItemPedidoEntity[];
}
