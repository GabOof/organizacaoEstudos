const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  prioridade: { type: Number, required: true },
  tempoEstimado: { type: Number, required: true },
});

const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;
