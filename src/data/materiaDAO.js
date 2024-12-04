const Materia = require("../models/materia");

// Função assíncrona para salvar uma nova matéria no banco de dados associada a um estudante
const salvarMateria = async (materia, estudanteId) => {
  try {
    // Cria uma nova instância do modelo Materia com os dados fornecidos
    const novaMateria = new Materia(materia);

    // Salva a nova matéria no banco de dados e retorna o resultado
    return await novaMateria.save();
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
    return await Materia.find().sort({ prioridade: 1 });
  } catch (error) {
    // Se ocorrer um erro ao buscar as matérias, exibe a mensagem de erro no console
    console.error("Erro ao buscar matérias do estudante:", error);
    // Lança o erro para ser tratado em outro lugar, se necessário
    throw error;
  }
};

// Exporta as funções para serem usadas em outras partes do código
module.exports = { salvarMateria, encontrarMateriasPorEstudante };
