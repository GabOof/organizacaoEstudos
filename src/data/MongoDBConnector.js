const mongoose = require("mongoose");
const DatabaseInterface = require("./databaseInterface");

// Conexão com o MongoDB usando a biblioteca Mongoose.
class MongoDBConnector extends DatabaseInterface {
    constructor() {
        super();
        this.connectionString = "mongodb://localhost:27017/organizacaoEstudos";
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
