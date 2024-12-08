class Estudante {
  constructor(nome, tempoDisponivel) {
    this.id = null; // Banco de dados vai gerar o ID
    this.nome = nome;
    this.tempoDisponivel = tempoDisponivel;
    this.dataCriacao = new Date(); // Adiciona a data de criação
  }

  setId(id) {
    this.id = id;
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

  setTempoDisponivel(tempoDisponivel) {
    this.tempoDisponivel = tempoDisponivel;
  }

  getTempoDisponivel() {
    return this.tempoDisponivel;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }

  setDataCriacao(dataCriacao) {
    this.dataCriacao = dataCriacao;
  }
}

module.exports = Estudante;
