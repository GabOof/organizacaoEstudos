const mongoose = require("mongoose");

// URL de conexão com o MongoDB local, especificando o nome do banco de dados
const url = "mongodb://localhost:27017/organizacaoEstudos"; 

// Função assíncrona para conectar ao MongoDB
async function connectDB() {
  try {
    // Tenta conectar ao MongoDB usando a URL definida
    await mongoose.connect(url, {});

    // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso no console
    console.log("Conectado ao MongoDB com Mongoose");
  } catch (error) {
    // Se ocorrer um erro na conexão, exibe a mensagem de erro no console
    console.error("Erro de conexão com o MongoDB:", error);
    // Lança o erro para que ele possa ser tratado em outro lugar, se necessário
    throw error;
  }
}

// Exporta a função para que possa ser usada em outras partes do código
module.exports = { connectDB };
