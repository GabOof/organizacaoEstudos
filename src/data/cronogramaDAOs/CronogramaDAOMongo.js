const CronogramaDAOInterface = require("./CronogramaDAOInterface");
const mongoose = require("mongoose");

// Definição do schema da Cronograma
const cronogramaSchema = new mongoose.Schema({
  estudanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estudante",
    required: true,
  }, // Referência ao estudante associado
  materias: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
        required: true,
      }, // Referência à matéria criada por um estudante
      nome: { type: String, required: true },
      prioridade: { type: Number, required: true },
      tempoAlocado: { type: Number, required: true },
      estudada: { type: Boolean, default: false },
    },
  ], // Array de matérias associadas ao cronograma
  dataCriacao: { type: Date, default: Date.now }, // Data de criação do cronograma
});

// Modelo do MongoDB a partir do schema
const CronogramaModel = mongoose.model("Cronograma", cronogramaSchema);

class CronogramaDAOMongo extends CronogramaDAOInterface {
  // Buscar o cronograma de um estudante específico
  async buscarCronogramaPorEstudante(estudanteId) {
    try {
      // Buscando o cronograma usando o ID do estudante (corrigido para 'estudanteId')
      return await CronogramaModel.findOne({ estudanteId: estudanteId })
        .populate("materias._id")
        .exec();
    } catch (error) {
      console.error("Erro ao buscar cronograma por estudante:", error);
      throw error;
    }
  }

  // Atualizar as matérias de um cronograma específico
  async atualizarMateriasNoCronograma(cronogramaId, dadosAtualizados) {
    try {
      // Atualiza o cronograma específico pelo ID
      const cronogramaAtualizado = await CronogramaModel.findByIdAndUpdate(
        cronogramaId, // O ID do cronograma
        { $set: { materias: dadosAtualizados } }, // Atualiza as matérias
        { new: true, runValidators: true } // Retorna o documento atualizado
      );
      return cronogramaAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar cronograma:", error.message);
      throw new Error("Não foi possível atualizar o cronograma.");
    }
  }

  // Gerar um novo cronograma para o estudante
  async gerarCronograma(cronograma) {
    try {
      // Cria uma instância do modelo CronogramaModel com os dados fornecidos
      const novoCronograma = new CronogramaModel({
        estudanteId: cronograma.getEstudanteId(),
        materias: cronograma.getMaterias(),
      });

      // Salva o novo cronograma no banco de dados
      return await novoCronograma.save();
    } catch (error) {
      console.error(`Erro ao gerar cronograma: ${error.message}`);
      throw new Error("Não foi possível gerar um cronograma para o estudante");
    }
  }

  // Marcar uma matéria como estudada no cronograma
  async marcarMateriaEstudada(materiaId) {
    try {
      // Atualiza a matéria específica no cronograma, marcando como estudada
      const cronograma = await CronogramaModel.findOneAndUpdate(
        { "materias._id": materiaId },
        { $set: { "materias.$.estudada": true } },
        { new: true } // Retorna o documento atualizado
      ).exec();

      // Verifica se o cronograma foi encontrado
      if (!cronograma) {
        throw new Error("Matéria não encontrada no cronograma.");
      }

      return cronograma;
    } catch (error) {
      console.error("Erro ao marcar matéria como estudada:", error);
      throw error;
    }
  }
}

module.exports = CronogramaDAOMongo;
