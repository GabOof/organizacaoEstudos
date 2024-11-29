// Classe abstrata que define a interface para os conectores de banco de dados.
class DatabaseService {

    // Estabelecer a conexão com o banco de dados específico.
    async connect() {
        throw new Error("Método 'connect' deve ser implementado");
    }
}

module.exports = DatabaseService;