const CronogramaDAOInterface = require("./CronogramaDAOInterface");
const mongoose = require("mongoose");

const cronogramaSchema = new mongoose.Schema({
    estudanteId: { type: mongoose.Schema.Types.ObjectId, ref: "Estudante", required: true}, // Referência ao estudante associado
    materias: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "Materia", required: true }, // Referência à matéria criada por um estudante
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

    async buscarCronogramaPorEstudante(estudanteId) {
        try {
            return await CronogramaModel.findOne({ estudante: estudanteId })
                .populate("materias._id")
                .exec();
        } catch (error) {
            console.error("Erro ao buscar cronograma por estudante:", error);
            throw error;
        }
    }

    async atualizarMateriasNoCronograma(cronogramaId, dadosAtualizados) {
        try {
            const cronogramaAtualizado = await this.CronogramaModel.findByIdAndUpdate(
                cronogramaId,           // ID do cronograma a ser atualizado
                { $set: dadosAtualizados }, // Dados que serão atualizados
                { new: true, runValidators: true } // Retornar o documento atualizado e validar
            );
            return cronogramaAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar cronograma:", error.message);
            throw new Error("Não foi possível atualizar o cronograma.");
        }
    }


    async gerarCronograma(cronograma) {
        try {
            const novoCronograma = new CronogramaModel({
                estudanteId: cronograma.getEstudanteId(),
                materias: cronograma.getMaterias(),
            });
            return await novoCronograma.save();
        } catch (error) {
            console.error(`Erro ao gerar cronograma: ${error.message}`);
            throw new Error("Não foi possível gerar um cronograma para o estudante");
        }
    }

    async marcarMateriaEstudada(materiaId) {
        try {
            const cronograma = await CronogramaModel.findOneAndUpdate(
                { "materias._id": materiaId },
                { $set: { "materias.$.estudada": true } },
                { new: true } // Retorna o documento atualizado
            ).exec();

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
