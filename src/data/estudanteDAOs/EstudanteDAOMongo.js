const EstudanteDAOInterface = require("./EstudanteDAOInterface");
const mongoose = require("mongoose");

// Definição do schema do Estudante
const estudanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tempoDisponivel: { type: Number, required: true },
  dataCriacao: { type: Date, default: Date.now },
});

// Modelo do MongoDB a partir do schema
const EstudanteModel = mongoose.model("Estudante", estudanteSchema);

class EstudanteDAOMongo extends EstudanteDAOInterface {

  // Salvar um estudante no banco de dados, recebe um objeto "estudante" e cria um documento no MongoDB
  async salvarEstudante(estudante) {
    try {

      // Criação de uma nova instância do modelo com os dados do estudante
      const novoEstudante = new EstudanteModel({
        nome: estudante.getNome(),
        tempoDisponivel: estudante.getTempoDisponivel(),
        dataCriacao: estudante.getDataCriacao(),
      });

      // Salva o documento no banco de dados e retorna o resultado
      return await novoEstudante.save();
    } catch (error) {
      console.error(`Erro ao salvar estudante: ${error.message}`);
      throw new Error("Não foi possível salvar o estudante");
    }
  }

  // Buscar um estudante no banco de dados pelo nome, retorna um estudante que possui o nome correspondente
  async buscarEstudantePorNome(nome) {
    try {
      return await EstudanteModel.findOne({ nome: nome });
    } catch (error) {
      console.error(
        `Erro ao buscar estudante por nome (${nome}): ${error.message}`
      );
      throw new Error("Não foi possível buscar o estudante pelo nome");
    }
  }

  // Buscar um estudante no banco de dados pelo ID, retorna o estudante com o ID correspondente
  async buscarEstudantePorId(id) {
    try {
      return await EstudanteModel.findById(id);
    } catch (error) {
      console.error(`Erro ao buscar estudante por ID (${id}): ${error.message}`);
      throw new Error("Não foi possível buscar o estudante pelo ID");
    }
  }
}

module.exports = EstudanteDAOMongo;
