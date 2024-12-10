const mysql = require("mysql2/promise");
const DatabaseConnection = require('./DatabaseConnection');
require('dotenv').config({path:'MySQL.env'});

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

    // Conectar com o banco MySQL
    async connect() {
        try{
            if (!this.pool) {
                this.pool = mysql.createPool(this.connectionString);
                console.log('Conexão MySQL estabelecida.');
            }
        } catch (error) {
            console.error("Erro ao conectar ao MySQL:", error.message);
            throw error;
        }
    }

    // Fechar a conexão com o MySQL
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

    // Retorna o pool de conexões
    getPool() {
        if (!this.pool) {
            throw new Error("Conexão com o banco de dados não estabelecida.");
        }
        return this.pool;
    }
}

module.exports = MySQLConnector;
