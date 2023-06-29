
export class UsuarioRepository {

    private usuarios = [];

    //Método para salva usuario
    salvar(usuario) {
        this.usuarios.push(usuario);
    }

    //Método para consultar todos usuario
    async listar() {
        return this.usuarios;
    }
}