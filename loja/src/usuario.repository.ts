
export class UsuarioRepository {

    private usuarios = [];

    //Método para salva usuario
    salvar(usuario) {
        this.usuarios.push(usuario);
        console.log(this.usuarios)
    }
}