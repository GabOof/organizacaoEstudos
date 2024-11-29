const express = require("express");
const cors = require("cors");
const { createDatabaseConnection } = require("./src/data/dataAccess");
const EstudanteDAO = require("./src/data/estudanteDAO");
const MateriaDAO = require("./src/data/materiaDAO");
const CronogramaController = require("./src/controllers/cronogramaController");

// Conexão com MongoDB
async function startDB() {
  try {
    const dbType = "mongodb";
    const connectionString = "mongodb://localhost:27017/organizacaoEstudos";

    const database = createDatabaseConnection(dbType, connectionString);
    await database.connect();
  } catch (error) {
    console.error("Erro ao iniciar o banco de dados:", error);
    process.exit(1); // Finaliza o processo em caso de falha
  }
}

// Conexão com MySQL
/*async function startDB() {
  try {
    const dbType = "mysql";
    const connectionString = {
      host: "localhost",
      user: "root",
      password: "Gvc@_1234",
      database: "organizacaoEstudos",
    };

    const database = createDatabaseConnection(dbType, connectionString);
    await database.connect();

    // Criação de tabelas para simulação
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS estudantes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        tempoDisponivel INT NOT NULL
      );
    `;
    await database.execute(createTableSQL);

    console.log("Banco de dados MySQL e tabelas configurados com sucesso!");
  } catch (error) {
    console.error("Erro ao iniciar o banco de dados:", error.message);
    process.exit(1);
  }
}*/

startDB();

const app = express(); // Inicialização da aplicação Express
const port = 3000; // Definição da porta para o servidor

// Habilita CORS para todas as origens
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota para criar um estudante
app.post("/estudante", async (req, res) => {
  // Desestruturação dos dados do corpo da requisição
  const { nome, tempoDisponivel } = req.body;

  // Verificação se os dados necessários estão presentes
  if (!nome || !tempoDisponivel) {
    return res
      .status(400) // Retorna status 400 se faltar nome ou tempoDisponivel
      .json({ error: "Nome e tempoDisponível são necessários" });
  }

  try {
    // Chama o DAO para salvar o estudante no banco de dados
    const estudante = await EstudanteDAO.salvarEstudante({
      nome,
      tempoDisponivel,
    });
    res.status(201).json(estudante); // Retorna o estudante criado com status 201
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar estudante" }); // Retorna erro 500 se falhar ao salvar
  }
});

// Rota para criar uma matéria
app.post("/materia", async (req, res) => {
  // Desestruturação dos dados do corpo da requisição
  const { nome, prioridade, tempoEstimado } = req.body;

  try {
    // Chama o DAO para salvar a matéria no banco de dados
    const materia = await MateriaDAO.salvarMateria({
      nome,
      prioridade,
      tempoEstimado,
    });
    res.status(201).json(materia); // Retorna a matéria criada com status 201
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar matéria" }); // Retorna erro 500 se falhar ao salvar
  }
});

// Rota para gerar o cronograma
app.get("/cronograma/:estudanteNome", async (req, res) => {
  // Recupera o nome do estudante da URL
  const { estudanteNome } = req.params;

  try {
    // Chama o controller para gerar o cronograma baseado no nome do estudante
    const cronograma = await CronogramaController.gerarCronograma(
      estudanteNome
    );
    if (cronograma.length === 0) {
      // Caso não haja cronograma gerado, retorna status 404
      return res.status(404).json({
        message: "Nenhuma matéria ou tempo disponível para gerar o cronograma",
      });
    }
    res.status(200).json(cronograma); // Retorna o cronograma com status 200
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar cronograma" }); // Retorna erro 500 se falhar ao gerar o cronograma
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); // Log para indicar que o servidor está em execução
});
