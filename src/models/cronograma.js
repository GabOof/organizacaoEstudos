class Cronograma {

  constructor(estudanteId, materias = []) {
    this.id = null; // Banco de dados vai gerar o ID
    this.estudanteId = estudanteId; // Referência ao ID do estudante
    this.materias = materias; // Array de objetos representando as matérias
    this.dataCriacao = new Date();
  }

  getId() {
    return this.id;
  }

  setEstudanteId(estudanteId) {
    this.estudanteId = estudanteId;
  }

  getEstudanteId() {
    return this.estudanteId;
  }

  setMaterias(materias) {
    this.materias = materias;
  }

  getMaterias() {
    return this.materias;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }
}

module.exports = Cronograma;
