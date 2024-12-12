const Materia = require('../models/materia');

class MateriaController {

    constructor(materiaDAO) {
        this.materiaDAO = materiaDAO;
    }

    // Salvar uma nova matéria
    async salvarMateria(req, res) {
        try {
            const { nome, prioridade, tempoEstimado, estudanteId } = req.body;

            // Validação básica
            if (!nome || !prioridade || !tempoEstimado || !estudanteId) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            const materia = new Materia(nome, prioridade, tempoEstimado, estudanteId);

            const novaMateria = await this.materiaDAO.salvarMateria(materia);
            res.status(201).json(novaMateria);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Erro ao salvar matéria" });
        }
    }

    // Buscar todas as matérias de um estudante
    async encontrarMateriasPorEstudante(req, res) {
        try {
            const { estudanteId } = req.params;

            if (!estudanteId) {
                return res.status(400).json({ error: "ID do estudante é obrigatório" });
            }

            const materias = await this.materiaDAO.encontrarMateriasPorEstudante(estudanteId);
            res.status(200).json(materias);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Erro ao buscar matérias do estudante" });
        }
    }


    // Atualizar uma matéria pelo ID
    async atualizarMateria(req, res) {
        try {
            const { materiaId } = req.params;
            const novosDados = req.body;

            if (!materiaId) {
                return res.status(400).json({ error: "ID da matéria é obrigatório" });
            }

            const materiaAtualizada = await this.materiaDAO.atualizarMateria(materiaId, novosDados);
            res.status(200).json(materiaAtualizada);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Erro ao atualizar matéria" });
        }
    }
}

module.exports = MateriaController;
