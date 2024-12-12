// Interface serve como um contrato que todas as implementações específicas de estudante DAO devem seguir
class EstudanteDAOInterface {

    async salvarEstudante(estudante) {
        throw new Error("Método 'salvarEstudante' não implementado");
    }

    async buscarEstudantePorNome(nome) {
        throw new Error("Método 'buscarEstudantePorNome' não implementado");
    }

    async buscarEstudantePorId(id) {
        throw new Error("Método 'buscarEstudantePorId' não implementado");
    }
}

module.exports = EstudanteDAOInterface;
