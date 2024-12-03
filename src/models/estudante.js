class Estudante {

  constructor(nome, tempoDisponivel) {
    this.id = null; // Banco de dados vai gerar o ID
    this.nome = nome;
    this.tempoDisponivel = tempoDisponivel;
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

}

module.exports = Estudante;
