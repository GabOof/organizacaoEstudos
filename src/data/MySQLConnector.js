const mysql = require("mysql2/promise");
const DatabaseInterface = require("./databaseInterface");

// Criação de tabelas para simulação
/*const createTableAluno = `
  CREATE TABLE IF NOT EXISTS estudantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tempoDisponivel INT NOT NULL
  );
`;*/

// Conexão e execução de comandos do MySQL
class MySQLConnector extends DatabaseInterface {
    constructor() {
        super();
        this.connectionString = {
            host: "localhost",
            user: "root",
            password: "suaSenha",
            database: "organizacaoEstudos",
        };
        this.connection = null;
    }

    // Estabelecer conexão com o MySQL.
    async connect() {
        try {
            this.connection = await mysql.createConnection(this.connectionString);
            //await this.execute(createTableAluno);
            console.log("Conectado ao MySQL com sucesso!");
        } catch (error) {
            console.error("Erro ao conectar ao MySQL:", error.message);
            throw error;
        }
    }

    // Executa um comando SQL no banco de dados.
    async execute(sql, params = []) {
        if (!this.connection) {
            throw new Error("Conexão com o banco de dados não estabelecida.");
        }
        try {
            // Executa o comando fornecido, passando os parâmetros para a consulta.
            const [rows] = await this.connection.execute(sql, params);
            return rows;
        } catch (error) {
            console.error("Erro ao executar comando SQL no MySQL:", error.message);
            throw error;
        }
    }
}

module.exports = MySQLConnector;
