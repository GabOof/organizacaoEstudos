const express = require("express");
const cors = require("cors");
const EstudanteController = require("../controllers/estudanteController");
const MateriaController = require("../controllers/materiaController");
const CronogramaController = require("../controllers/cronogramaController");
const EstudanteDAOMongo = require("../data/estudanteDAOs/EstudanteDAOMongo");
const MateriaDAOMongo = require("../data/materiaDAOs/MateriaDAOMongo");
const CronogramaDAOMongo = require("../data/cronogramaDAOs/CronogramaDAOMongo");

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

    // Instanciando os controllers de models
    const estudanteController = new EstudanteController(new EstudanteDAOMongo());
    const materiaController = new MateriaController(new MateriaDAOMongo());
    const cronogramaController = new CronogramaController(new CronogramaDAOMongo(), new EstudanteDAOMongo(), new MateriaDAOMongo());

    // Rota para criar um estudante
    this.app.post(
      "/estudante",
      async (req, res) => await estudanteController.salvarEstudante(req, res)
    );

    // Rota para criar uma matéria
    this.app.post(
        "/materia",
        async (req, res) => await materiaController.salvarMateria(req, res)
    );

    // Rota para buscar estudante pelo nome
    this.app.get(
        "/estudante/nome/:nome",
        async (req, res) => await estudanteController.buscarEstudantePorNome(req, res)
    );

    // Rota para gerar o cronograma
    this.app.get(
        "/cronograma/:estudanteNome",
        async (req, res) => await cronogramaController.gerarCronograma(req, res)
    );

    // Rota para marcar uma matéria como estudada
    this.router.post(
        "/materia/estudar/:materiaId",
        async (req, res) => await cronogramaController.marcarMateriaEstudada(req, res)
    );

    // Rota para marcar uma matéria como estudada
    this.app.post(
        "/materia/editar/:materiaId",
        async (req, res) => await materiaController.atualizarMateria(req, res)
    );

    // Middleware para tratamento de erros
    this.app.use(this.router);
  }
}

module.exports = Router;
