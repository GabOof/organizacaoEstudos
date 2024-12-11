const express = require("express");
const cors = require("cors");
const MateriaDAO = require("../data/materiaDAO");
const EstudanteController = require("../controllers/estudanteController");
const EstudanteDAOMongo = require("../data/EstudanteDAOMongo");
const CronogramaController = require("../controllers/cronogramaController");

// Classe para configurar as rotas da aplicação
class Router {
  constructor(app) {
    this.router = express.Router();
    this.app = app;
    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    // Habilita CORS para todas as origens
    this.app.use(cors());

    // Middleware para interpretar JSON no corpo das requisições
    this.app.use(express.json());
  }

  // Método para configurar as rotas da aplicação
  configureRoutes() {
    // Instanciando controller do estudante
    const estudanteController = new EstudanteController(
      new EstudanteDAOMongo()
    );

    // Rota para criar um estudante
    this.app.post(
      "/estudante",
      async (req, res) => await estudanteController.salvarEstudante(req, res)
    );

    // TODO criar materiaController e chamar um método de salvarMateria do controller. Main não pode chamar DAO direto
    // Rota para criar uma matéria
    this.app.post("/materia", async (req, res) => {
      try {
        // Desestruturação dos dados do corpo da requisição
        const { nome, prioridade, tempoEstimado, estudanteId } = req.body;

        // Verifica se o estudanteId foi informado
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
    this.app.get("/estudante/nome/:nome", async (req, res) => {
      const { nome } = req.params; // Desestruturação do nome do estudante da URL

      try {
        const estudanteDAO = new EstudanteDAOMongo(); // Instancia a classe EstudanteDAOMongo
        // Chama o DAO para buscar o estudante no banco de dados
        const estudante = await estudanteDAO.buscarEstudantePorNome(nome);

        // Verifica se o estudante foi encontrado
        if (!estudante) {
          return res.status(404).json({ message: "Estudante não encontrado" }); // Retorna erro 404 se não encontrar o estudante
        }
        res.status(200).json(estudante); // Retorna o estudante encontrado com status 200
      } catch (error) {
        console.error("Erro ao buscar estudante:", error); // Log do erro no console
        res
          .status(500)
          .json({ message: "Erro ao buscar estudante", error: error.message }); // Retorna erro 500 se falhar ao buscar o estudante
      }
    });

    // Rota para gerar o cronograma
    this.app.get("/cronograma/:estudanteNome", async (req, res) => {
      const { estudanteNome } = req.params; // Desestruturação do nome do estudante da URL

      try {
        // Chama o controller para gerar o cronograma do estudante
        const cronograma = await CronogramaController.gerarCronograma(
          estudanteNome
        );

        // Verifica se o cronograma foi gerado
        if (cronograma.length === 0) {
          return res.status(404).json({
            message:
              "Nenhuma matéria ou tempo disponível para gerar o cronograma",
          }); // Retorna erro 404 se não encontrar matérias ou tempo disponível
        }
        res.status(200).json(cronograma); // Retorna o cronograma gerado com status 200
      } catch (error) {
        res.status(500).json({ error: "Erro ao gerar cronograma" }); // Retorna erro 500 se falhar ao gerar o cronograma
      }
    });

    // Rota para marcar uma matéria como estudada
    this.router.post("/materia/estudar/:materiaId", async (req, res) => {
      try {
        // Recupera o id da matéria da URL
        const materiaId = req.params.materiaId;
        const materiaAtualizada =
          await CronogramaController.marcarMateriaEstudada(materiaId); // Chama o controller para marcar a matéria como estudada
        res.json(materiaAtualizada); // Retorna a matéria atualizada
      } catch (error) {
        res.status(400).json({
          message: "Erro ao atualizar a matéria",
          error: error.message,
        }); // Retorna erro 400 se falhar ao marcar a matéria como estudada
      }
    });

    // TODO criar materiaController e chamar um método de atualizaMataria do controller. Main não pode chamar DAO direto
    // Rota para editar uma matéria no cronograma
    this.app.post("/cronograma/editar/:materiaId", async (req, res) => {
      const { materiaId } = req.params; // Recupera o id da matéria da URL
      const { tempoAlocado, prioridade } = req.body; // Desestruturação dos dados do corpo da requisição

      try {
        const novosDados = {}; // Objeto para armazenar os novos dados da matéria

        // Verifica se o tempoAlocado e prioridade foram informados
        if (tempoAlocado) novosDados.tempoEstimado = tempoAlocado;
        if (prioridade) novosDados.prioridade = prioridade;

        // Chama o DAO para atualizar a matéria no banco de dados
        const materiaAtualizada = MateriaDAO.atualizarMateria(
          materiaId,
          novosDados
        );

        res.json(materiaAtualizada); // Retorna a matéria atualizada
      } catch (error) {
        console.error("Erro na edição do cronograma:", error); // Log do erro no console
        if (error.message.includes("Matéria não encontrada")) {
          return res.status(404).json({ message: "Matéria não encontrada" }); // Retorna erro 404 se a matéria não for encontrada
        }
        res
          .status(500)
          .json({ message: "Erro ao editar matéria no cronograma" }); // Retorna erro 500 se falhar ao editar a matéria
      }
    });

    // Middleware para tratamento de erros
    this.app.use(this.router);
  }
}

module.exports = Router;
