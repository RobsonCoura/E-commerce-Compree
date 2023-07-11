import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

/*Um modulo é uma classe que tem o decorator @Module() que fornece metadados que o Nest,
 usa para organizar o estrutura da aplicação, nesses metadados que informamos que é o controller, 
 provider e assim por diante.*/
@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  //Referencias para Classe que o Nest.js gerencie a criacao desses objetos.
  providers: [ProdutoService],
})
export class ProdutoModule {}
