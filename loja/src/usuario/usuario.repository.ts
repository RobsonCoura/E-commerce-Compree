import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {

    private usuarios: UsuarioEntity[] = [];

    //Método para salva usuário
    salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    //Método para consultar todos usuário
    async listar() {
        return this.usuarios;
    }


    //Método de buscar usuário por e-mail
    async existeEsseEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }


    //Método para atualizar um usuario
    async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );
        // Verificando se encontrou o usuário, para depois atualizar
        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }
        //Valida se email é realmente um email e verifica se já tem gravado na base de dados
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }
            possivelUsuario[chave] = valor;
        });

        return possivelUsuario;
    }
}