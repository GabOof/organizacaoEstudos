const Materia = require("../models/materia");
const mongoose = require("mongoose");

// Função assíncrona para salvar uma nova matéria no banco de dados associada a um estudante
const salvarMateria = async (materia, estudanteId) => {
  try {
    // Cria uma nova instância do modelo Materia com os dados fornecidos
    const novaMateria = new Materia(materia);

    // Salva a nova matéria no banco de dados e retorna o resultado
    return await novaMateria.save({ estudanteId });
  } catch (error) {
    // Exibe a mensagem de erro no console e lança o erro
    console.error("Erro ao salvar matéria:", error);
    throw error;
  }
};

// Função para encontrar as matérias relacionadas a um estudante específico
const encontrarMateriasPorEstudante = async (estudanteId) => {
  try {
    // Busca todas as matérias no banco de dados, ordenando pelo campo "prioridade" em ordem crescente
    return await Materia.find({ estudanteId }).sort({ prioridade: 1 });
  } catch (error) {
    // Se ocorrer um erro ao buscar as matérias, exibe a mensagem de erro no console
    console.error("Erro ao buscar matérias do estudante:", error);
    // Lança o erro para ser tratado em outro lugar, se necessário
    throw error;
  }
};

// Função assíncrona para atualizar os campos de uma matéria no banco de dados
const atualizarMateria = async (materiaId, novosDados) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(materiaId)) {
      throw new Error("ID de matéria inválido");
    }

    // Verifique se a matéria existe
    const materia = await Materia.findById(materiaId);
    if (!materia) {
      throw new Error("Matéria não encontrada");
    }

    // Atualize a matéria com os novos dados, incluindo o campo tempoAlocado
    const materiaAtualizada = await Materia.findByIdAndUpdate(
      materiaId,
      novosDados,
      { new: true }
    );

    // Retorna a matéria atualizada
    return materiaAtualizada;
  } catch (error) {
    console.error("Erro ao atualizar matéria:", error);
    throw error;
  }
};

// Exporta as funções para serem usadas em outras partes do código
module.exports = {
  salvarMateria,
  encontrarMateriasPorEstudante,
  atualizarMateria,
};
