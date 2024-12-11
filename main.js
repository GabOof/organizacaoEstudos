const express = require("express");
const cors = require("cors");
const MongoDB = require("./src/data/connections/MongoDBConnection");
const MateriaDAO = require("./src/data/materiaDAOs/materiaDAO");
const EstudanteController = require("./src/controllers/estudanteController");
const EstudanteDAOMongo = require("./src/data/estudanteDAOs/EstudanteDAOMongo");
const CronogramaController = require("./src/controllers/cronogramaController");

// Conexão com o banco de dados desejado
const database = new MongoDB();
database.connect();

const app = express(); // Inicialização da aplicação Express
const router = express.Router(); // Inicialização do roteador Express
const port = 3000; // Definição da porta para o servidor

// Habilita CORS para todas as origens
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Instanciando controller do estudante
const estudanteController = new EstudanteController(new EstudanteDAOMongo());

// Rota para criar um estudante
app.post(
  "/estudante",
  async (req, res) => await estudanteController.salvarEstudante(req, res)
);

// TODO criar materiaController e chamar um método de salvarMateria do controller. Main não pode chamar DAO direto
// Rota para criar uma matéria
app.post("/materia", async (req, res) => {
  try {
    // Desestruturação dos dados do corpo da requisição
    const { nome, prioridade, tempoEstimado, estudanteId } = req.body;

    if (!estudanteId) {
      return res.status(400).json({ message: "EstudanteId é obrigatório" });
    }

    // Chama o DAO para salvar a matéria no banco de dados
    const materia = await MateriaDAO.salvarMateria({
      nome,
      prioridade,
      tempoEstimado,
      estudanteId,
    });
    res.status(201).json(materia); // Retorna a matéria criada com status 201
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar matéria" }); // Retorna erro 500 se falhar ao salvar
  }
});

// TODO criar um método no estudanteController de buscarEstudantePorNome. Main não pode chamar DAO diretamente
// Rota para buscar estudante pelo nome
app.get("/estudante/nome/:nome", async (req, res) => {
  const { nome } = req.params;

  try {
    // Instancia a classe EstudanteDAOMongo
    const estudanteDAO = new EstudanteDAOMongo();
    // Chama o método de instância buscarEstudantePorNome
    const estudante = await estudanteDAO.buscarEstudantePorNome(nome);

    // Verifica se o estudante foi encontrado
    if (!estudante) {
      return res.status(404).json({ message: "Estudante não encontrado" });
    }
    res.status(200).json(estudante); // Retorna o estudante encontrado
  } catch (error) {
    console.error("Erro ao buscar estudante:", error); // Registra o erro no console do servidor
    res
      .status(500)
      .json({ message: "Erro ao buscar estudante", error: error.message }); // Retorna erro 500 se falhar ao buscar
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

// Rota para marcar uma matéria como estudada
router.post("/materia/estudar/:materiaId", async (req, res) => {
  try {
    const materiaId = req.params.materiaId;
    const materiaAtualizada = await CronogramaController.marcarMateriaEstudada(
      materiaId
    );
    res.json(materiaAtualizada);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar a matéria", error: error.message });
  }
});

// TODO criar materiaController e chamar um método de atualizaMataria do controller. Main não pode chamar DAO direto
// Rota para editar uma matéria no cronograma
app.post("/cronograma/editar/:materiaId", async (req, res) => {
  const { materiaId } = req.params;
  const { tempoAlocado, prioridade } = req.body;

  try {
    const novosDados = {};
    if (tempoAlocado) novosDados.tempoEstimado = tempoAlocado;
    if (prioridade) novosDados.prioridade = prioridade;

    const materiaAtualizada = MateriaDAO.atualizarMateria(
      materiaId,
      novosDados
    );

    res.json(materiaAtualizada);
  } catch (error) {
    console.error("Erro na edição do cronograma:", error);
    if (error.message.includes("Matéria não encontrada")) {
      return res.status(404).json({ message: "Matéria não encontrada" });
    }
    res.status(500).json({ message: "Erro ao editar matéria no cronograma" });
  }
});

// Middleware para tratamento de erros
app.use(router);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); // Log para indicar que o servidor está em execução
});
