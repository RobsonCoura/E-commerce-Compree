import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

/*DTO (Data Transfer Object) para transferir dados entre camadas da aplicação,
 isso ajuda a manter a separação de responsabilidades e a garantir a integridade dos dados*/
class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;
  @IsInt()
  quantidade: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
