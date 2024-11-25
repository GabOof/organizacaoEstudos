const Estudante = require("../models/estudante");

// Função assíncrona para salvar um estudante no banco de dados
const salvarEstudante = async (estudante) => {
  try {
    // Tenta criar e salvar o estudante no banco de dados
    return await Estudante.create(estudante);
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error("Erro ao salvar estudante:", error);
    // Lança o erro para ser tratado em outro lugar, se necessário
    throw error;
  }
};

// Função assíncrona para buscar um estudante no banco de dados pelo nome
const buscarEstudantePorNome = async (nome) => {
  try {
    // Tenta encontrar o estudante no banco de dados pelo nome
    return await Estudante.findOne({ nome: nome });
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error("Erro ao buscar estudante:", error);
    // Lança o erro para ser tratado em outro lugar, se necessário
    throw error;
  }
};

// Exporta as funções para serem usadas em outras partes do código
module.exports = {
  salvarEstudante,
  buscarEstudantePorNome,
};
