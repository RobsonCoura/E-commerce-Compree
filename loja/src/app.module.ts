import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigService } from './config/postgres.config.service';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
  ],
})
export class AppModule {}
