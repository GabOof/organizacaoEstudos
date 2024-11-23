const Materia = require("../models/materia");

const salvarMateria = async (materia) => {
  const novaMateria = new Materia(materia);
  return await novaMateria.save();
};

const encontrarMateriasPorPrioridade = async () => {
  try {
    // Buscando todas as matérias ordenadas pela prioridade
    return await Materia.find().sort({ prioridade: 1 });
  } catch (error) {
    console.error("Erro ao buscar matérias:", error);
    throw error;
  }
};

module.exports = { salvarMateria, encontrarMateriasPorPrioridade };
