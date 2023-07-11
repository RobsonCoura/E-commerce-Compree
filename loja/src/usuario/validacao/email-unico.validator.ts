import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}
  /*Método verifica se já existe o e-mail cadastrado no banco, 
  se nao existir permite vc cadastrar um usuario*/
  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
        value,
      );

      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      return false;
    }
  }
}

//Método para verificacao se e-mail já existe no banco de dados
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
