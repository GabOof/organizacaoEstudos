// Interface para a conexão com o banco de dados
class DatabaseConnection {
    async connect() {
        throw new Error('Método "connect" deve ser implementado.');
    }

    async disconnect() {
        throw new Error('Método "disconnect" deve ser implementado.');
    }
}

module.exports = DatabaseConnection;