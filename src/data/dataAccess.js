const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/organizacaoEstudos"; // URL do MongoDB local com nome do banco de dados

async function connectDB() {
  try {
    await mongoose.connect(url, {});

    console.log("Conectado ao MongoDB com Mongoose");
  } catch (error) {
    console.error("Erro de conexão com o MongoDB:", error);
    throw error;
  }
}

module.exports = { connectDB };
