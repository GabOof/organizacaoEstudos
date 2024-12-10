const express = require("express");
const MongoDB = require("./src/data/MongoDBConnection");
const Router = require("./src/routes/Router");

const database = new MongoDB(); // Instância da conexão com o banco de dados
database.connect(); // Conexão com o banco de dados

const app = express(); // Inicialização da aplicação Express
const port = 3000; // Definição da porta para o servidor

// Configuração de rotas
new Router(app);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); // Log para indicar que o servidor está em execução
});
