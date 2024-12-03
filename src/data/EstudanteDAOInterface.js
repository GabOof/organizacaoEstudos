// Interface serve como um contrato que todas as implementações específicas de DAO devem seguir.
class EstudanteDAOInterface {

    async salvarEstudante(estudante) {
        throw new Error("Método 'salvar' não implementado");
    }

    async buscarEstudantePorNome(nome) {
        throw new Error("Método 'buscarPorNome' não implementado");
    }

    async buscarEstudantePorId(id) {
        throw new Error("Método 'buscarPorId' não implementado");
    }
}

module.exports = EstudanteDAOInterface;
