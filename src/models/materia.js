class Materia {

  constructor(nome, prioridade, tempoEstimado, estudanteId) {
    this.id = null; // Banco de dados vai gerar o ID
    this.nome = nome;
    this.prioridade = prioridade; // Números altos indicam maior prioridade
    this.tempoEstimado = tempoEstimado; // Tempo estimado para estudar a matéria
    this.estudanteId = estudanteId; // Referência ao ID do estudante
    this.estudada = false;
    this.dataCriacao = new Date(); // Data de criação do cronograma
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
