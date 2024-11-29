const mongoose = require("mongoose");
const DatabaseInterface = require("./databaseService");

// Conexão com o MongoDB usando a biblioteca Mongoose.
class MongoDBConnector extends DatabaseInterface {
    constructor(connectionString) {
        super();
        this.connectionString = connectionString;
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
}

module.exports = MongoDBConnector;
