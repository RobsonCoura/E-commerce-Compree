import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from '../produto/produto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { PedidoController } from './pedido.controller';
import { PedidoEntity } from './pedido.entity';
import { PedidoService } from './pedido.service';

/*Um modulo é uma classe que tem o decorator @Module() que fornece metadados que o Nest,
 usa para organizar o estrutura da aplicação, nesses metadados que informamos que é o controller, 
 provider e assim por diante.*/
@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
