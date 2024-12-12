const Cronograma = require("../models/cronograma");

class CronogramaController {

  constructor(cronogramaDAO, estudanteDAO, materiaDAO) {
    this.cronogramaDAO = cronogramaDAO;
    this.estudanteDAO = estudanteDAO;
    this.materiaDAO = materiaDAO;
  }

  async buscarCronogramaPorEstudante(estudante, res) {
    const estudanteId  = estudante._id;

    // Validação do ID do estudante
    if (!estudanteId) {
      return res.status(400).json({ error: "O ID do estudante é obrigatório." });
    }

    // Chama função de DAO para buscar o cronograma
    try {
      return await this.cronogramaDAO.buscarCronogramaPorEstudante(estudanteId);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar cronograma." });
    }
  }

  async atualizarMateriasNoCronograma(cronogramaID, materias, res) {
    if (!cronogramaID) {
      return res.status(400).json({ error: "ID do cronograma é obrigatório." });
    }

    try {
      return await this.cronogramaDAO.atualizarMateriasNoCronograma(cronogramaID, materias);
    } catch (error) {
      console.error("Erro ao atualizar cronograma:", error.message);
      return res.status(500).json({ error: "Erro ao atualizar o cronograma." });
    }
  }

  async gerarCronograma(req, res) {
    const { estudanteNome } = req.params;

    // Validação do parâmetro nome
    if (!estudanteNome || estudanteNome.trim() === "") {
      return res.status(400).json({ error: "O nome do estudante é obrigatório." });
    }

    try {

      // Encontrar o estudante dado o nome passado no parâmetro
      const estudante = await this.estudanteDAO.buscarEstudantePorNome(estudanteNome);

      // Buscar todas as metérias desse estudante
      const materiasEstudante = await this.materiaDAO.encontrarMateriasPorEstudante(estudante._id);

      let tempoDisponivel = estudante.tempoDisponivel;

      // Ordenar as matérias por prioridade (menor número = maior prioridade)
      materiasEstudante.sort((a, b) => a.prioridade - b.prioridade);

      const materiasCronograma = [];
      for (const materia of materiasEstudante) {
        if (tempoDisponivel >= materia.tempoEstimado) {
          materiasCronograma.push({
            _id: materia._id,
            nome: materia.nome,
            prioridade: materia.prioridade,
            tempoAlocado: materia.tempoEstimado,
            estudada: materia.estudada,
          });
          tempoDisponivel -= materia.tempoEstimado;
        } else if (tempoDisponivel > 0) {
          materiasCronograma.push({
            _id: materia._id,
            nome: materia.nome,
            prioridade: materia.prioridade,
            tempoAlocado: tempoDisponivel,
            estudada: materia.estudada,
          });
          tempoDisponivel = 0;
          break;
        } else {
          break;
        }
      }

      // Verificar se esse estudante tem um cronograma
      let cronogramaEstudante = await this.buscarCronogramaPorEstudante(estudante, res);

      if (!cronogramaEstudante) {

        // Gerar um cronograma para o estudante
        const novoCronograma = await this.cronogramaDAO.gerarCronograma(new Cronograma(estudante._id, materiasCronograma));

        if (!novoCronograma) {
          res.status(500).json({ error: "Erro ao criar o cronograma." });
        }else{
          res.status(200).json(novoCronograma);
        }
      } else {

        // Atualizar cronograma existente
        const cronogramaAtualizado = await this.atualizarMateriasNoCronograma(cronogramaEstudante.id, materiasCronograma, res)
        res.status(200).json(cronogramaAtualizado);
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao gerar o cronograma." });
    }
  }

  async marcarMateriaEstudada(req, res) {
    try {
      const { materiaId } = req.params;
      const novosDados = {estudada: true}

      const cronogramaAtualizado = await this.cronogramaDAO.marcarMateriaEstudada(materiaId);
      this.materiaDAO.atualizarMateria(materiaId, novosDados)

      res.status(200).json(cronogramaAtualizado);
    } catch (error) {
      console.error("Erro ao marcar matéria como estudada:", error);
      res.status(500).json({ error: "Erro interno ao atualizar matéria no cronograma." });
    }
  }

}

module.exports = CronogramaController;