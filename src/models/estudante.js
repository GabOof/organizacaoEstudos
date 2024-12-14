class Estudante {

  constructor(nome, tempoDisponivel) {
    this.id = null; // Banco de dados vai gerar o ID
    this.nome = nome;
    this.tempoDisponivel = tempoDisponivel; // Tempo disponível para estudar
    this.dataCriacao = new Date(); // Data de criação do estudante
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
}

module.exports = Estudante;
