const EstudanteDAO = require("../data/estudanteDAO");
const MateriaDAO = require("../data/materiaDAO");
const Cronograma = require("../models/cronograma");

const gerarCronograma = async (estudanteNome) => {
  try {
    // Busca o estudante no banco
    const estudante = await EstudanteDAO.buscarEstudantePorNome(estudanteNome);

    if (!estudante) {
      throw new Error("Estudante não encontrado");
    }

    // Busca as matérias cadastradas, ordenadas pela prioridade
    const materias = await MateriaDAO.encontrarMateriasPorPrioridade();

    if (materias.length === 0) {
      throw new Error("Nenhuma matéria cadastrada");
    }

    let tempoDisponivel = estudante.tempoDisponivel;
    const cronograma = [];

    // Aloca o tempo nas matérias, respeitando a prioridade
    for (const materia of materias) {
      if (tempoDisponivel >= materia.tempoEstimado) {
        // Adiciona matéria ao cronograma
        cronograma.push({
          nome: materia.nome,
          tempoAlocado: materia.tempoEstimado,
        });
        // Subtrai o tempo alocado
        tempoDisponivel -= materia.tempoEstimado;
      } else if (tempoDisponivel > 0) {
        // Caso o tempo disponível seja insuficiente, aloca o tempo restante
        cronograma.push({
          nome: materia.nome,
          tempoAlocado: tempoDisponivel,
        });
        break; // Não há mais tempo disponível para outras matérias
      } else {
        break; // Não há mais tempo disponível para nenhuma outra matéria
      }
    }

    // Agora, vamos salvar o cronograma no banco de dados
    const cronogramaSalvo = await Cronograma.create({
      estudante: estudante._id, // Referência ao estudante
      materias: cronograma, // Matérias alocadas
    });

    return cronogramaSalvo; // Retorne o cronograma salvo
  } catch (error) {
    console.error("Erro ao gerar cronograma:", error);
    throw error;
  }
};

module.exports = {
  gerarCronograma,
};
