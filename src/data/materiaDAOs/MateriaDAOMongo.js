const MateriaDAOInterface = require("./MateriaDAOInterface");
const mongoose = require("mongoose");

// Definição do schema da Matéria
const materiaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    prioridade: { type: Number, required: true },
    tempoEstimado: { type: Number, required: true },
    estudanteId: { type: mongoose.Schema.Types.ObjectId, required: true},
    estudada: { type: Boolean, default: false },
    dataCriacao: { type: Date, default: Date.now },
});

// Modelo do MongoDB a partir do schema
const MateriaModel = mongoose.model("Materia", materiaSchema);

class MateriaDAOMongo extends MateriaDAOInterface {

    // Salvar uma matéria no banco de dados, recebe um objeto "materia" e cria um documento no MongoDB
    async salvarMateria(materia) {
        try {

            // Criação de uma nova instância do modelo com os dados da matéria
            const novaMateria = new MateriaModel({
                nome: materia.getNome(),
                prioridade: materia.getPrioridade(),
                tempoEstimado: materia.getTempoEstimado(),
                estudanteId: materia.getEstudanteId(),
                estudada: materia.getEstudada(),
                dataCriacao: materia.getDataCriacao(),
            });

            // Salva o documento no banco de dados e retorna o resultado
            return await novaMateria.save();
        } catch (error) {
            console.error(`Erro ao salvar matéria: ${error.message}`);
            throw new Error("Não foi possível salvar a matéria");
        }
    }

    // Buscar todas as matérias criadas por um estudante com base no ID do estudante, retorna uma lista de matérias associadas ao estudante
    async encontrarMateriasPorEstudante(estudanteId) {
        try {
            return await MateriaModel.find({ estudanteId });
        } catch (error) {
            console.error(`Erro ao buscar matérias do estudante ${estudanteId}: ${error.message}`);
            throw new Error("Não foi possível buscar as matérias do estudante");
        }
    }

    // Atualizar dados de uma matéria com base no seu ID, recebe o ID da matéria e os novos dados de a serem atualizados
    async atualizarMateria(materiaId, novosDados) {
        try {

            // Atualiza o documento no banco de dados com base no ID da matéria
            const materiaAtualizada = await MateriaModel.findByIdAndUpdate(
                materiaId,
                novosDados, /* tempo estimado e prioridade */
                { new: true, runValidators: true }
            );

            // Lança erro se a matéria foi atualizada corretamente
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
