const Estudante = require('../models/Estudante');

class EstudanteController {
    constructor(estudanteDAO) {
        this.estudanteDAO = estudanteDAO;
    }

    // Criar um novo estudante, recebe os dados do estudante da requisição e cria uma nova instância de Estudante
    async salvarEstudante(req, res) {
        try {
            const { nome, tempoDisponivel } = req.body;

            // Instancia o modelo Estudante com os dados recebidos
            const estudante = new Estudante(nome, tempoDisponivel);

            // Chama o DAO de estudante para salvar o estudante no banco de dados
            const novoEstudante = await this.estudanteDAO.salvarEstudante(estudante);

            res.status(201).json(novoEstudante);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar estudante: ' + error.message });
        }
    }

    // Obter um estudante específico pelo nome, recebe o nome do estudante via parâmetros na URL e busca no banco
    async buscarEstudantePorNome(req, res) {
        try {
            const nome = req.params.nome;

            // Chama o DAO para buscar o estudante pelo nome
            const estudante = await this.estudanteDAO.buscarEstudantePorNome(nome);

            // Verifica se o estudante foi encontrado e retorna o resultado
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
