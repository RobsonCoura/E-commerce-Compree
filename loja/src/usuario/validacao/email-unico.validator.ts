import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioRepository: UsuarioRepository) { }

    async validate(value: any, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeEsseEmail(value);
        return !usuarioComEmailExiste;
    }

}

//Funcao verifica se email já existe na API
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        });
    }
}