const mongoose = require("mongoose");

// Define o esquema (estrutura) do modelo "Cronograma"
const cronogramaSchema = new mongoose.Schema({
  // Referência ao modelo "Estudante", criando uma relação entre Cronograma e Estudante
  estudante: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dado que armazena um ObjectId
    ref: "Estudante", // Nome do modelo referenciado (Estudante)
    required: true, // Campo obrigatório
  },

  // Array de objetos que armazena as matérias e o tempo alocado para cada uma
  materias: [
    {
      nome: String, // Nome da matéria (tipo String)
      tempoAlocado: Number, // Tempo alocado para a matéria (tipo Number)
    },
  ],

  // Data de criação do cronograma (por padrão, é a data atual)
  dataCriacao: {
    type: Date, // Tipo de dado Date para armazenar a data
    default: Date.now, // Valor padrão é a data e hora atuais
  },
});

// Cria o modelo "Cronograma" a partir do esquema definido
const Cronograma = mongoose.model("Cronograma", cronogramaSchema);

// Exporta o modelo para que possa ser usado em outras partes do código
module.exports = Cronograma;
