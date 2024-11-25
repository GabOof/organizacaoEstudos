const mongoose = require("mongoose");

// Define o esquema (estrutura) do modelo "Estudante"
const estudanteSchema = new mongoose.Schema({
  // Nome do estudante (campo obrigatório)
  nome: {
    type: String, // Tipo de dado String
    required: true, // Campo obrigatório
  },

  // Tempo disponível para o estudante (campo obrigatório)
  tempoDisponivel: {
    type: Number, // Tipo de dado Number
    required: true, // Campo obrigatório
  },
});

// Cria o modelo "Estudante" a partir do esquema definido
const Estudante = mongoose.model("Estudante", estudanteSchema);

// Exporta o modelo para que possa ser usado em outras partes do código
module.exports = Estudante;
