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

  // Referência ao ID do estudante
  estudanteId: {
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId do MongoDB
    ref: "Estudante", // Refere-se ao modelo Estudante
    required: true, // Campo obrigatório
  },

  // Indica se a matéria foi estudada
  estudada: {
    type: Boolean, // Tipo de dado Boolean
    default: false, // Por padrão, a matéria não é estudada
  },

  // Data de criação da metéria (por padrão, é a data atual)
  dataCriacao: {
    type: Date, // Tipo de dado Date para armazenar a data
    default: Date.now, // Valor padrão é a data e hora atuais
  },
});

// Cria o modelo "Materia" a partir do esquema definido
const Materia = mongoose.model("Materia", materiaSchema);

// Exporta o modelo para que possa ser usado em outras partes do código
module.exports = Materia;
