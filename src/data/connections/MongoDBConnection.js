const mongoose = require("mongoose");
const DatabaseConnection = require('./DatabaseConnection');
require('dotenv').config({path:'Mongo.env'});

class MongoDBConnection extends DatabaseConnection {
    constructor() {
        super();
        this.connectionString = process.env.DB_URL
    }

    // Conexão com o MongoDB usando a string de conexão fornecida.
    async connect() {
        try {
            await mongoose.connect(this.connectionString, {});
            console.log("Conectado ao MongoDB com Mongoose");
        } catch (error) {
            console.error("Erro de conexão com o MongoDB:", error);
            throw error;
        }
    }

    /**
     * Fecha a conexão com o MongoDB
     */
    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Conexão com MongoDB encerrada');
        } catch (error) {
            console.error('Erro ao desconectar do MongoDB:', error.message);
        }
    }
}

module.exports = MongoDBConnection;