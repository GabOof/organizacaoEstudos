const mysql = require("mysql2/promise");
const DatabaseConnection = require('./DatabaseConnection');
require('dotenv').config({path:'MySQL.env'});

// TODO tirar a criação da tabela da classe de conexão
// Criação de tabelas para simulação
/*const createTableAluno = `
  CREATE TABLE IF NOT EXISTS estudantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tempoDisponivel INT NOT NULL
  );
`;*/

// Conexão com do MySQL
class MySQLConnector extends DatabaseConnection {
    constructor() {
        super();
        this.connectionString = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        };
        this.pool = null;
    }

    // TODO tirar a execução da query da conexão
    async connect() {
        try{
            if (!this.pool) {
                this.pool = mysql.createPool(this.connectionString);
                //await this.execute(createTableAluno);
                console.log('Conexão MySQL estabelecida.');
            }
        } catch (error) {
            console.error("Erro ao conectar ao MySQL:", error.message);
            throw error;
        }
    }

    async disconnect() {
        try{
            if (this.pool) {
                await this.pool.end();
                console.log('Conexão MySQL encerrada.');
            }
        } catch (error) {
            console.error("Erro ao conectar ao MySQL:", error.message);
            throw error;
        }
    }

    // TODO criar uma classe de QueryExecutor para executar queries
    // Executa um comando SQL no banco de dados.
    async execute(sql, params = []) {
        if (!this.pool) {
            throw new Error("Conexão com o banco de dados não estabelecida.");
        }
        try {
            // Executa o comando fornecido, passando os parâmetros para a consulta.
            const [rows] = await this.pool.execute(sql, params);
            return rows;
        } catch (error) {
            console.error("Erro ao executar comando SQL no MySQL:", error.message);
            throw error;
        }
    }
}

module.exports = MySQLConnector;
