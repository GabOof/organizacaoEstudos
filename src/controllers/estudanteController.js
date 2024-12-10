const Estudante = require('../models/Estudante');

class EstudanteController {
    constructor(estudanteDAO) {
        this.estudanteDAO = estudanteDAO;
    }

    // Criar um novo estudante
    async salvarEstudante(req, res) {
        try {
            const { nome, tempoDisponivel } = req.body;

            // Instanciando a classe estudante
            const estudante = new Estudante(nome, tempoDisponivel);

            const novoEstudante = await this.estudanteDAO.salvarEstudante(estudante);
            res.status(201).json(novoEstudante);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar estudante: ' + error.message });
        }
    }

    // Obter um estudante específico pelo ID
    async buscarEstudantePorID(req, res) {
        try {
            const estudanteId = req.params.id;
            const estudante = await this.estudanteDAO.buscarEstudantePorId(estudanteId);
            if (estudante) {
                res.status(200).json(estudante);
            } else {
                res.status(404).json({ message: 'Estudante não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar estudante: ' + error.message });
        }
    }

    // Obter um estudante específico pelo nome
    async buscarEstudantePorNome(req, res) {
        try {
            const nome = req.params.nome;
            const estudante = await this.estudanteDAO.buscarEstudantePorNome(nome);
            if (estudante) {
                res.status(200).json(estudante);
            } else {
                res.status(404).json({ message: 'Estudante não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar estudante: ' + error.message });
        }
    }

}

module.exports = EstudanteController;
