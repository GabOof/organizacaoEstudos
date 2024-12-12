// Interface serve como um contrato que todas as implementações específicas matéria de DAO devem seguir.
class MateriaDAOInterface {

    async salvarMateria(materia, estudanteId) {
        throw new Error("Método 'salvarMateria' não implementado.");
    }

    async encontrarMateriasPorEstudante(estudanteId) {
        throw new Error("Método 'encontrarMateriasPorEstudante' não implementado.");
    }

    async atualizarMateria(materiaId, novosDados) {
        throw new Error("Método 'atualizarMateria' não implementado.");
    }
}

module.exports = MateriaDAOInterface;
