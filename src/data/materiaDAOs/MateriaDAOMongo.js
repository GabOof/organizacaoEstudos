const MateriaDAOInterface = require("./MateriaDAOInterface");
const mongoose = require("mongoose");

// Definição do schema da Matéria
const materiaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    prioridade: { type: Number, required: true },
    tempoEstimado: { type: Number, required: true },
    estudanteId: { type: mongoose.Schema.Types.ObjectId, required: true},
    estudada: { type: Boolean, default: false }, // Controle se a matéria foi estudada
    dataCriacao: { type: Date, default: Date.now }, // Data de criação
});

// Modelo do MongoDB a partir do schema
const MateriaModel = mongoose.model("Materia", materiaSchema);

class MateriaDAOMongo extends MateriaDAOInterface {

    // Salvar uma matéria no banco de dados
    async salvarMateria(materia) {
        try {
            const novaMateria = new MateriaModel({
                nome: materia.getNome(),
                prioridade: materia.getPrioridade(),
                tempoEstimado: materia.getTempoEstimado(),
                estudanteId: materia.getEstudanteId(),
                estudada: materia.getEstudada(),
                dataCriacao: materia.getDataCriacao(),
            });
            return await novaMateria.save();
        } catch (error) {
            console.error(`Erro ao salvar matéria: ${error.message}`);
            throw new Error("Não foi possível salvar a matéria");
        }
    }

    // Buscar todas as matérias criadas por um estudante com base no ID do estudante
    async encontrarMateriasPorEstudante(estudanteId) {
        try {
            return await MateriaModel.find({ estudanteId });
        } catch (error) {
            console.error(`Erro ao buscar matérias do estudante ${estudanteId}: ${error.message}`);
            throw new Error("Não foi possível buscar as matérias do estudante");
        }
    }

    // Atualizar dados de uma matéria com base no seu ID
    async atualizarMateria(materiaId, novosDados) {
        try {
            const materiaAtualizada = await MateriaModel.findByIdAndUpdate(
                materiaId,
                novosDados,
                { new: true, runValidators: true }
            );
            if (!materiaAtualizada) {
                throw new Error(`Matéria com ID ${materiaId} não encontrada para atualização`);
            }
            return materiaAtualizada;
        } catch (error) {
            console.error(`Erro ao atualizar matéria com ID ${materiaId}: ${error.message}`);
            throw new Error("Não foi possível atualizar a matéria");
        }
    }

}

module.exports = MateriaDAOMongo;
