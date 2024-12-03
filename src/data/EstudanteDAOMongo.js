const EstudanteDAOInterface = require('./EstudanteDAOInterface');
const mongoose = require('mongoose');

// Definição do schema do Estudante
const estudanteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tempoDisponivel: { type: Number, required: true },
});

// Modelo do MongoDB a partir do schema
const EstudanteModel = mongoose.model('Estudante', estudanteSchema);

class EstudanteDAOMongo extends EstudanteDAOInterface {

    // Salvar um estudante no banco de dados
    async salvarEstudante(estudante) {
        try {
            const novoEstudante = new EstudanteModel({
                nome: estudante.getNome(),
                tempoDisponivel:estudante.getTempoDisponivel(),
            });
            return await novoEstudante.save();
        } catch (error) {
            console.error(`Erro ao salvar estudante: ${error.message}`);
            throw new Error('Não foi possível salvar o estudante');
        }
    }

    // Buscar um estudante no banco de dados pelo nome
    async buscarEstudantePorNome(nome) {
        try {
            return await EstudanteModel.findOne({ nome: nome });
        } catch (error) {
            console.error(`Erro ao buscar estudante por nome (${nome}): ${error.message}`);
            throw new Error('Não foi possível buscar o estudante pelo nome');
        }
    }

    // Buscar um estudante no banco de dados pelo ID
    async buscarEstudantePorId(id) {
        try {
            return await EstudanteModel.findById(id);
        } catch (error) {
            console.error(`Erro ao buscar estudante por ID (${id}): ${error.message}`);
            throw new Error('Não foi possível buscar o estudante pelo ID');
        }
    }
}

module.exports = EstudanteDAOMongo;
