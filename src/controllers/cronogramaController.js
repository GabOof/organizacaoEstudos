const EstudanteDAO = require("../data/EstudanteDAOMongo");
const MateriaDAO = require("../data/materiaDAO");
const Materia = require("../models/materia");
const Cronograma = require("../models/cronograma");

const mongoose = require("mongoose");

// Função para buscar o cronograma existente de um estudante
const buscarCronogramaPorEstudante = async (estudanteId) => {
  try {
    // Busca o cronograma do estudante
    const cronograma = await Cronograma.findOne({
      estudante: estudanteId,
    }).populate("materias._id");

    console.log("Cronograma encontrado:", cronograma);

    if (!cronograma) return null; // Retorna null se não houver cronograma

    // Atualiza o status de 'estudada' para as matérias no cronograma
    for (const item of cronograma.materias) {
      const materiaAtualizada = await Materia.findById(item._id); // Busca matéria mais recente
      console.log("Matéria atualizada:", materiaAtualizada);
      if (materiaAtualizada && item.estudada !== materiaAtualizada.estudada) {
        // Sincroniza status de 'estudada'
        item.estudada = materiaAtualizada.estudada;
      }
    }

    // Salva as atualizações no cronograma, caso tenha mudado
    await cronograma.save();

    return cronograma; // Retorna o cronograma atualizado
  } catch (error) {
    console.error("Erro ao buscar cronograma:", error);
    throw error;
  }
};

// Função para gerar o cronograma de estudos de um estudante
const gerarCronograma = async (estudanteNome) => {
  try {
    const dao = new EstudanteDAO();

    // Busca o estudante no banco de dados usando o nome
    const estudante = await dao.buscarEstudantePorNome(estudanteNome);

    // Verifica se o estudante foi encontrado, caso contrário, lança um erro
    if (!estudante) {
      throw new Error("Estudante não encontrado");
    }

    // TODO: verificar se houve atualizações nas matérias desse aluno
    // Verifica se o estudante já possui um cronograma
    const cronogramaExistente = await buscarCronogramaPorEstudante(
      estudante._id
    );

    // Caso exista um cronograma, atualiza as matérias com os dados mais recentes
    if (cronogramaExistente) {
      const materiaDAO = MateriaDAO;

      // Atualiza as matérias do cronograma com as matérias mais recentes
      const materiasAtualizadas =
        await materiaDAO.encontrarMateriasPorEstudante(estudante._id);

      const cronogramaAtualizado = cronogramaExistente;
      cronogramaAtualizado.materias = []; // Limpar as matérias existentes

      let tempoDisponivel = estudante.tempoDisponivel;

      // Loop para alocar o tempo disponível nas matérias, respeitando a prioridade
      for (const materia of materiasAtualizadas) {
        if (tempoDisponivel >= materia.tempoEstimado) {
          cronogramaAtualizado.materias.push({
            nome: materia.nome,
            prioridade: materia.prioridade,
            tempoAlocado: materia.tempoEstimado,
            estudada: materia.estudada,
            _id: materia._id,
          });
          tempoDisponivel -= materia.tempoEstimado;
        } else if (tempoDisponivel > 0) {
          cronogramaAtualizado.materias.push({
            nome: materia.nome,
            prioridade: materia.prioridade,
            tempoAlocado: tempoDisponivel,
            estudada: materia.estudada,
            _id: materia._id,
          });
          break;
        } else {
          break;
        }
      }

      // Atualize o cronograma completo
      await cronogramaAtualizado.save();

      for (const materia of cronogramaAtualizado.materias) {
        await MateriaDAO.atualizarMateria(materia._id, {
          tempoAlocado: materia.tempoAlocado,
        });
      }

      return cronogramaAtualizado; // Retorna o cronograma atualizado
    }

    // Caso não haja cronograma existente, cria um novo
    const materias = await MateriaDAO.encontrarMateriasPorEstudante(
      estudante._id
    );

    // Verifica se há matérias cadastradas para o estudante, caso contrário, lança um erro
    if (materias.length === 0) {
      throw new Error("Nenhuma matéria cadastrada para esse estudante");
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
          estudada: materia.estudada, // Estudante já estudou a matéria ou não
          _id: materia._id, // ID da matéria
        });
        // Subtrai o tempo alocado da quantidade de tempo disponível
        tempoDisponivel -= materia.tempoEstimado;
      } else if (tempoDisponivel > 0) {
        // Se o tempo disponível for menor que o necessário, aloca o tempo restante
        cronograma.push({
          nome: materia.nome,
          tempoAlocado: tempoDisponivel, // Tempo alocado é o que resta disponível
          estudada: materia.estudada, // Estudante já estudou a matéria ou não
          _id: materia._id, // ID da matéria
        });
        break; // Não há mais tempo disponível para outras matérias
      } else {
        break; // Se não houver mais tempo disponível, encerra o loop
      }
    }

    // Cria o novo cronograma e salva no banco de dados
    const cronogramaSalvo = await Cronograma.create({
      estudante: estudante._id, // Referência ao estudante no cronograma
      materias: cronograma, // Lista das matérias alocadas no cronograma
    });

    return cronogramaSalvo; // Retorna o cronograma salvo
  } catch (error) {
    // Em caso de erro, exibe a mensagem no console e lança o erro novamente
    console.error("Erro ao gerar cronograma:", error);
    throw error;
  }
};

// Função para marcar uma matéria como estudada
const marcarMateriaEstudada = async (materiaId) => {
  try {
    // Verifica se o materiaId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(materiaId)) {
      throw new Error("ID de matéria inválido");
    }

    // Busca a matéria para validar se existe no banco
    const materia = await Materia.findById(materiaId);
    if (!materia) {
      throw new Error("Matéria não encontrada");
    }

    // Marca a matéria como estudada
    materia.estudada = true;
    await materia.save();

    // Atualiza o cronograma associado ao estudante da matéria
    const estudanteId = materia.estudante; // ID do estudante associado à matéria
    const cronogramaAtualizado = await buscarCronogramaPorEstudante(
      estudanteId
    );

    return cronogramaAtualizado; // Retorna o cronograma atualizado
  } catch (error) {
    console.error("Erro ao marcar matéria como estudada:", error);
    throw error;
  }
};

// Função para editar uma matéria no cronograma
const editarMateria = async (materiaId, novaInformacao) => {
  try {
    // Instanciando o MateriaDAO para acessar os métodos
    const materiaDAO = MateriaDAO;

    // Atualizar a matéria no banco de dados
    const materiaAtualizada = await materiaDAO.atualizarMateria(
      materiaId,
      novaInformacao
    );

    // Agora, precisamos atualizar o cronograma para refletir a alteração no tempoAlocado
    const cronograma = await Cronograma.findOne({
      "materias._id": materiaId,
    });

    if (!cronograma) {
      throw new Error("Cronograma não encontrado");
    }

    // Encontre a matéria no cronograma
    const materiaNoCronograma = cronograma.materias.find(
      (materia) => String(materia._id) === String(materiaId)
    );

    if (materiaNoCronograma) {
      // Atualizando o tempo alocado no cronograma
      if (novaInformacao.tempoAlocado) {
        console.log("Atualizando tempo alocado:", novaInformacao.tempoAlocado);
        materiaNoCronograma.tempoAlocado = novaInformacao.tempoAlocado;
      }
    }

    // Salve o cronograma com o novo tempo alocado
    await cronograma.save();
    console.log("Cronograma atualizado com novo tempo alocado");

    return materiaAtualizada; // Retorna a matéria atualizada
  } catch (err) {
    console.error("Erro ao editar matéria:", err);
    throw err; // Lançar erro novamente para ser tratado no nível superior
  }
};

module.exports = {
  gerarCronograma,
  marcarMateriaEstudada,
  buscarCronogramaPorEstudante,
  editarMateria,
};
