const mongoose = require("mongoose");

const cronogramaSchema = new mongoose.Schema({
  estudante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estudante",
    required: true,
  },
  materias: [
    {
      nome: String,
      tempoAlocado: Number,
    },
  ],
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const Cronograma = mongoose.model("Cronograma", cronogramaSchema);

module.exports = Cronograma;
