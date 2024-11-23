const express = require("express");
const { connectDB } = require("./src/data/dataAccess"); // Corrigido
const EstudanteDAO = require("./src/data/estudanteDAO");
const MateriaDAO = require("./src/data/materiaDAO");
const CronogramaController = require("./src/controllers/cronogramaController");

// Conectar ao MongoDB
connectDB();

const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota para criar um estudante
app.post("/estudante", async (req, res) => {
  const { nome, tempoDisponivel } = req.body;

  if (!nome || !tempoDisponivel) {
    return res
      .status(400)
      .json({ error: "Nome e tempoDisponível são necessários" });
  }

  try {
    const estudante = await EstudanteDAO.salvarEstudante({
      nome,
      tempoDisponivel,
    });
    res.status(201).json(estudante);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar estudante" });
  }
});

// Rota para criar uma matéria
app.post("/materia", async (req, res) => {
  const { nome, prioridade, tempoEstimado } = req.body;

  try {
    const materia = await MateriaDAO.salvarMateria({
      nome,
      prioridade,
      tempoEstimado,
    });
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar matéria" });
  }
});

// Rota para gerar o cronograma
app.get("/cronograma/:estudanteNome", async (req, res) => {
  const { estudanteNome } = req.params;

  try {
    const cronograma = await CronogramaController.gerarCronograma(
      estudanteNome
    );
    if (cronograma.length === 0) {
      return res.status(404).json({
        message: "Nenhuma matéria ou tempo disponível para gerar o cronograma",
      });
    }
    res.status(200).json(cronograma);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar cronograma" });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
