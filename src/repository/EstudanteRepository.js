const Estudante = require("../models/estudante");

// Classe intermediária entre o DAO e a aplicação responsável por realizar operações relacionadas a estudantes usando o DAO fornecido.
class EstudanteRepository {

    // DAO genérico injetado no construtor
    constructor(dao) {
        this.dao = dao;
    }

    // Cria uma instância da classe Estudante com os dados fornecidos e delega a persistência ao DAO injetado
    async salvarEstudante(dadosEstudante) {
        const estudante = new Estudante();
        estudante.setNome(dadosEstudante.nome);
        estudante.setTempoDisponivel(dadosEstudante.tempoDisponivel);
        return await this.dao.salvarEstudante(estudante);
    }

    // Delegado ao DAO para buscar nome do estudante.
    async buscarEstudantePorNome(nome) {
        return await this.dao.buscarEstudantePorNome(nome);
    }

    // Delegado ao DAO para buscar ID do estudante.
    async buscarEstudantePorId(id) {
        return await this.dao.buscarEstudantePorId(id);
    }
}

module.exports = EstudanteRepository;
