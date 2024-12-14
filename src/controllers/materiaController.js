const Materia = require("../models/materia");

class MateriaController {
  constructor(materiaDAO) {
    this.materiaDAO = materiaDAO;
  }

  // Salvar uma nova matéria no banco de dados
  async salvarMateria(req, res) {
    try {
      // Desestruturação dos dados recebidos no corpo da requisição
      const { nome, prioridade, tempoEstimado, estudanteId } = req.body;

      // Validação básica: todos os campos são obrigatórios
      if (!nome || !prioridade || !tempoEstimado || !estudanteId) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Cria uma instância do modelo de Matéria
      const materia = new Materia(nome, prioridade, tempoEstimado, estudanteId);

      // Chama DAO de matéria para salvar a matéria no banco de dados através do DAO
      const novaMateria = await this.materiaDAO.salvarMateria(materia);

      res.status(201).json(novaMateria);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro ao salvar matéria" });
    }
  }

  // Buscar todas as matérias de um estudante com base no ID do estudante
  async encontrarMateriasPorEstudante(req, res) {
    try {
      const { estudanteId } = req.params;

      // Valida se o ID do estudante foi informado
      if (!estudanteId) {
        return res.status(400).json({ error: "ID do estudante é obrigatório" });
      }

      // Chama DAo de matéria para buscar as matérias do estudante
      const materias = await this.materiaDAO.encontrarMateriasPorEstudante(
        estudanteId
      );

      res.status(200).json(materias);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro ao buscar matérias do estudante" });
    }
  }

  // Atualizar os dados de uma matéria pelo ID
  async atualizarMateria(req, res) {
    try {
      // Extrai o ID da matéria dos parâmetros da URL e os novos dados do corpo da requisição
      const { materiaId } = req.params;
      const novosDados = req.body;

      // Valida se o ID da matéria foi informado
      if (!materiaId) {
        return res.status(400).json({ error: "ID da matéria é obrigatório" });
      }

      // Chama o DAO de matéria para atualizar a matéria com base no ID e nos novos dados
      const materiaAtualizada = await this.materiaDAO.atualizarMateria(
        materiaId,
        novosDados
      );

      res.status(200).json(materiaAtualizada);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro ao atualizar matéria" });
    }
  }

  // Método para excluir uma matéria pelo ID
  async excluirMateria(req, res) {
    try {
      const { materiaId } = req.params;

      // Valida se o ID da matéria foi fornecido
      if (!materiaId) {
        return res.status(400).json({ error: "ID da matéria é obrigatório" });
      }

      // Chama o DAO para excluir a matéria
      const materiaExcluida = await this.materiaDAO.excluirMateria(materiaId);

      if (!materiaExcluida) {
        return res.status(404).json({ error: "Matéria não encontrada" });
      }

      // Caso a matéria tenha sido excluída com sucesso, retornamos uma resposta positiva
      res.status(200).json({ message: "Matéria excluída com sucesso" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro ao excluir matéria" });
    }
  }
}

module.exports = MateriaController;
