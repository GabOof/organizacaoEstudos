class Materia {

  constructor(nome, prioridade, tempoEstimado, estudanteId) {
    this.id = null; // Banco de dados vai gerar o ID
    this.nome = nome;
    this.prioridade = prioridade;
    this.tempoEstimado = tempoEstimado;
    this.estudanteId = estudanteId; // Referência ao ID do estudante
    this.estudada = false; // Por padrão, a matéria não é estudada
    this.dataCriacao = new Date();
  }

  getId() {
    return this.id;
  }

  setNome(nome) {
    this.nome = nome;
  }

  getNome() {
    return this.nome;
  }

  setPrioridade(prioridade) {
    this.prioridade = prioridade;
  }

  getPrioridade() {
    return this.prioridade;
  }

  setTempoEstimado(tempoEstimado) {
    this.tempoEstimado = tempoEstimado;
  }

  getTempoEstimado() {
    return this.tempoEstimado;
  }

  setEstudanteId(estudanteId) {
    this.estudanteId = estudanteId;
  }

  getEstudanteId() {
    return this.estudanteId;
  }

  setEstudada(estudada) {
    this.estudada = estudada;
  }

  getEstudada() {
    return this.estudada;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }
}

module.exports = Materia;
