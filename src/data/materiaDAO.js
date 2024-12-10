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

// Função para encontrar uma matéria dado o ID
async function encontrarMateriaPorId(id) {
  try {
    // Verifica se o ID fornecido é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    // Busca a matéria pelo ID
    const materia = await Materia.findById(id);

    // Se a matéria não for encontrada, exibe uma mensagem no console e retorna null
    if (!materia) {
      console.log("Matéria não encontrada");
      return null;
    }

    // Retorna a matéria encontrada
    return materia;
  } catch (erro) {
    // Em caso de erro, exibe a mensagem no console e lança o erro novamente
    console.error("Erro ao buscar a matéria:", erro.message);
    throw erro;
  }
}

// Função assíncrona para atualizar os campos de uma matéria no banco de dados
const atualizarMateria = async (materiaId, novosDados) => {
  try {
    // Verifique se o ID da matéria é válido
    if (!mongoose.Types.ObjectId.isValid(materiaId)) {
      throw new Error("ID de matéria inválido");
    }

    // Verifique se a matéria existe
    const materiaExistente = encontrarMateriaPorId(materiaId);
    if (!materiaExistente) {
      throw new Error("Matéria não encontrada para atualização");
    }

    // Atualiza apenas os campos tempoAlocado e prioridade
    const camposAtualizados = {
      ...(novosDados.tempoEstimado !== undefined && {
        tempoEstimado: novosDados.tempoEstimado,
      }),
      ...(novosDados.prioridade !== undefined && {
        prioridade: novosDados.prioridade,
      }),
    };

    // Atualiza a matéria com os novos dados de tampo estimado e prioridade
    const materiaAtualizada = await Materia.findByIdAndUpdate(
      materiaId,
      camposAtualizados,
      { new: true } // Retorna o documento atualizado
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
