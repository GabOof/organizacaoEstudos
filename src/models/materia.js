const mongoose = require("mongoose");

// Define o esquema (estrutura) do modelo "Materia"
const materiaSchema = new mongoose.Schema({
  // Nome da matéria (campo obrigatório)
  nome: {
    type: String, // Tipo de dado String
    required: true, // Campo obrigatório
  },

  // Prioridade da matéria (campo obrigatório)
  prioridade: {
    type: Number, // Tipo de dado Number
    required: true, // Campo obrigatório
  },

  // Tempo estimado para a matéria (campo obrigatório)
  tempoEstimado: {
    type: Number, // Tipo de dado Number
    required: true, // Campo obrigatório
  },
});

// Cria o modelo "Materia" a partir do esquema definido
const Materia = mongoose.model("Materia", materiaSchema);

// Exporta o modelo para que possa ser usado em outras partes do código
module.exports = Materia;
