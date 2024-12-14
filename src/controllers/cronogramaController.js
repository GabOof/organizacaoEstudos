const Cronograma = require("../models/cronograma");

class CronogramaController {
  // Construtor recebe dependências do DAO do cronograma, estudante e matéria
  constructor(cronogramaDAO, estudanteDAO, materiaDAO) {
    this.cronogramaDAO = cronogramaDAO;
    this.estudanteDAO = estudanteDAO;
    this.materiaDAO = materiaDAO;
  }

  // Buscar o cronograma de um estudante
  async buscarCronogramaPorEstudante(estudante, res) {
    const estudanteId = estudante._id;

    // Validação para garantir que o ID do estudante seja fornecido
    if (!estudanteId) {
      return res
        .status(400)
        .json({ error: "O ID do estudante é obrigatório." });
    }

    // Chama o DAO para buscar o cronograma do estudante pelo ID
    try {
      return await this.cronogramaDAO.buscarCronogramaPorEstudante(estudanteId);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar cronograma." });
    }
  }

  // Atualizar as matérias de um cronograma
  async atualizarMateriasNoCronograma(cronogramaID, materias, res) {
    if (!cronogramaID) {
      return res.status(400).json({ error: "ID do cronograma é obrigatório." });
    }

    // Chama o DAO para atualizar as matérias no cronograma pelo ID
    try {
      return await this.cronogramaDAO.atualizarMateriasNoCronograma(
        cronogramaID,
        materias
      );
    } catch (error) {
      console.error("Erro ao atualizar cronograma:", error.message);
      return res.status(500).json({ error: "Erro ao atualizar o cronograma." });
    }
  }

  // Gerar um novo cronograma para o estudante
  async gerarCronograma(req, res) {
    const { estudanteNome } = req.params;

    // Validação para garantir que o nome do estudante seja fornecido
    if (!estudanteNome || estudanteNome.trim() === "") {
      return res
        .status(400)
        .json({ error: "O nome do estudante é obrigatório." });
    }

    try {
      // Encontra o estudante pelo nome utilizando o DAO
      const estudante = await this.estudanteDAO.buscarEstudantePorNome(
        estudanteNome
      );

      // Se o estudante não for encontrado
      if (!estudante) {
        return res.status(404).json({ error: "Estudante não encontrado." });
      }

      // Buscar todas as matérias desse estudante
      const materiasEstudante =
        await this.materiaDAO.encontrarMateriasPorEstudante(estudante._id);

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
          break; // Sai do loop se o tempo disponível acabar
        } else {
          break; // Sai do loop se não houver mais tempo disponível
        }
      }

      // Verifica se já existe um cronograma para o estudante
      let cronogramaEstudante =
        await this.cronogramaDAO.buscarCronogramaPorEstudante(estudante._id);

      if (!cronogramaEstudante) {
        // Se não houver cronograma, cria um novo
        const novoCronograma = await this.cronogramaDAO.gerarCronograma(
          new Cronograma(estudante._id, materiasCronograma)
        );

        if (!novoCronograma) {
          res.status(500).json({ error: "Erro ao criar o cronograma." });
        } else {
          res.status(200).json(novoCronograma);
        }
      } else {
        // Se houver cronograma, atualiza as matérias no cronograma existente
        cronogramaEstudante.materias = materiasCronograma; // Atualiza as matérias
        const cronogramaAtualizado =
          await this.cronogramaDAO.atualizarMateriasNoCronograma(
            cronogramaEstudante._id, // O ID do cronograma
            cronogramaEstudante.materias // As novas matérias
          );

        res.status(200).json(cronogramaAtualizado);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao gerar o cronograma." });
    }
  }

  // Função para marcar uma matéria como estudada no cronograma
  async marcarMateriaEstudada(req, res) {
    try {
      const { materiaId } = req.params;
      const novosDados = { estudada: true };

      // Atualiza o cronograma marcando a matéria como estudada
      const cronogramaAtualizado =
        await this.cronogramaDAO.marcarMateriaEstudada(materiaId);

      // Atualiza a matéria no banco para marcar como estudada
      this.materiaDAO.atualizarMateria(materiaId, novosDados);

      res.status(200).json(cronogramaAtualizado);
    } catch (error) {
      console.error("Erro ao marcar matéria como estudada:", error);
      res
        .status(500)
        .json({ error: "Erro interno ao atualizar matéria no cronograma." });
    }
  }
}

module.exports = CronogramaController;
