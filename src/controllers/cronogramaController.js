const EstudanteDAO = require("../data/estudanteDAO");
const MateriaDAO = require("../data/materiaDAO");
const Cronograma = require("../models/cronograma");

// Função para gerar o cronograma de estudos de um estudante
const gerarCronograma = async (estudanteNome) => {
  try {
    // Busca o estudante no banco de dados usando o nome
    const estudante = await EstudanteDAO.buscarEstudantePorNome(estudanteNome);

    // Verifica se o estudante foi encontrado, caso contrário, lança um erro
    if (!estudante) {
      throw new Error("Estudante não encontrado");
    }

    // Busca as matérias cadastradas e ordena por prioridade
    const materias = await MateriaDAO.encontrarMateriasPorPrioridade();

    // Verifica se há matérias cadastradas, caso contrário, lança um erro
    if (materias.length === 0) {
      throw new Error("Nenhuma matéria cadastrada");
    }

    // Inicializa o tempo disponível do estudante para alocar nas matérias
    let tempoDisponivel = estudante.tempoDisponivel;
    const cronograma = []; // Array que armazenará as matérias e tempos alocados

    // Loop para alocar o tempo disponível nas matérias, respeitando a prioridade
    for (const materia of materias) {
      if (tempoDisponivel >= materia.tempoEstimado) {
        // Se o tempo disponível for suficiente, aloca o tempo total da matéria
        cronograma.push({
          nome: materia.nome, // Nome da matéria
          tempoAlocado: materia.tempoEstimado, // Tempo alocado à matéria
        });
        // Subtrai o tempo alocado da quantidade de tempo disponível
        tempoDisponivel -= materia.tempoEstimado;
      } else if (tempoDisponivel > 0) {
        // Se o tempo disponível for menor que o necessário, aloca o tempo restante
        cronograma.push({
          nome: materia.nome,
          tempoAlocado: tempoDisponivel, // Tempo alocado é o que resta disponível
        });
        break; // Não há mais tempo disponível para outras matérias
      } else {
        break; // Se não houver mais tempo disponível, encerra o loop
      }
    }

    // Salva o cronograma gerado no banco de dados, associando ao estudante
    const cronogramaSalvo = await Cronograma.create({
      estudante: estudante._id, // Referência ao estudante no cronograma
      materias: cronograma, // Lista das matérias alocadas no cronograma
    });

    // Retorna o cronograma salvo
    return cronogramaSalvo;
  } catch (error) {
    // Em caso de erro, exibe a mensagem no console e lança o erro novamente
    console.error("Erro ao gerar cronograma:", error);
    throw error;
  }
};

module.exports = {
  gerarCronograma, // Exporta a função para ser utilizada em outras partes do código
};
