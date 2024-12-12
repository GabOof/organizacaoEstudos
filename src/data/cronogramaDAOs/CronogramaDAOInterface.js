// Interface serve como um contrato que todas as implementações específicas de estudante DAO devem seguir

class CronogramaDAOInterface {

    async buscarCronogramaPorEstudante(estudanteId) {
        throw new Error("Método 'buscarCronogramaPorEstudante' não implementado.");
    }

    async gerarCronograma(cronograma) {
        throw new Error("Método 'gerarCronograma' não implementado.");
    }

    async marcarMateriaEstudada(materiaId) {
        throw new Error("Método 'marcarMateriaEstudada' não implementado.");
    }
}

module.exports = CronogramaDAOInterface;
