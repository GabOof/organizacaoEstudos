const Estudante = require("../models/estudante");

const salvarEstudante = async (estudante) => {
  try {
    return await Estudante.create(estudante);
  } catch (error) {
    console.error("Erro ao salvar estudante:", error);
    throw error;
  }
};

const buscarEstudantePorNome = async (nome) => {
  try {
    return await Estudante.findOne({ nome: nome });
  } catch (error) {
    console.error("Erro ao buscar estudante:", error);
    throw error;
  }
};

module.exports = {
  salvarEstudante,
  buscarEstudantePorNome,
};
