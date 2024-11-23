const mongoose = require("mongoose");

const estudanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tempoDisponivel: { type: Number, required: true },
});

const Estudante = mongoose.model("Estudante", estudanteSchema);

module.exports = Estudante;
