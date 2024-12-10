const API_URL = "http://localhost:3000"; // URL base da API

// Variável global para armazenar o ID do estudante
let estudanteId = null;

// Função para enviar dados do formulário de estudante
document
  .getElementById("form-estudante") // Seleciona o formulário de estudante
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome-estudante").value;
    const tempoDisponivel = document.getElementById("tempo-disponivel").value;

    try {
      // Faz uma requisição POST para criar um estudante
      const response = await fetch(`${API_URL}/estudante`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, tempoDisponivel }),
      });
      const data = await response.json(); // Extrai a resposta da API como JSON

      if (response.ok) {
        estudanteId = data._id; // Atualiza o estudanteId global com o valor correto
        alert("Estudante salvo com sucesso!"); // Informa o usuário sobre o sucesso
        document.getElementById("form-estudante").reset(); // Limpa o formulário
      } else {
        alert(data.message || "Erro ao salvar estudante");
      }
    } catch (error) {
      alert("Erro ao salvar estudante"); // Mostra um alerta caso ocorra erro
    }
  });

// Função para enviar dados do formulário de matéria
document
  .getElementById("form-materia") // Seleciona o formulário de matéria
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome-materia").value;
    const prioridade = document.getElementById("prioridade").value;
    const tempoEstimado = document.getElementById("tempo-estimado").value;
    const nomeEstudante = document.getElementById(
      "nome-estudante-materia"
    ).value;

    // Valida se o campo de nome do estudante está preenchido
    if (!nomeEstudante) {
      alert("Por favor, forneça o nome do estudante!");
      return;
    }

    try {
      // Buscar o ID do estudante
      const responseEstudante = await fetch(
        `${API_URL}/estudante/nome/${nomeEstudante}`
      );
      const dataEstudante = await responseEstudante.json(); // Extrai a resposta da API como JSON

      // Verifica se o estudante foi encontrado
      if (!responseEstudante.ok) {
        alert(dataEstudante.message || "Estudante não encontrado");
        return;
      }

      const estudanteId = dataEstudante._id; // ID do estudante

      // Faz uma requisição POST para criar uma matéria associada ao estudante
      const response = await fetch(`${API_URL}/materia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define o cabeçalho como JSON
        body: JSON.stringify({
          nome,
          prioridade,
          tempoEstimado,
          estudanteId,
        }), // Corpo da requisição com os dados da matéria
      });
      const data = await response.json(); // Extrai a resposta da API como JSON

      if (response.ok) {
        alert("Matéria salva com sucesso!"); // Informa o usuário sobre o sucesso
        document.getElementById("form-materia").reset(); // Limpa o formulário
      } else {
        alert(data.message || "Erro ao salvar matéria");
      }
    } catch (error) {
      alert("Erro ao salvar matéria"); // Mostra um alerta caso ocorra erro
    }
  });

// Função para gerar cronograma
document
  .getElementById("form-cronograma") // Seleciona o formulário de cronograma
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

    // Captura o valor do campo de nome do estudante
    const estudanteNome = document.getElementById(
      "nome-estudante-cronograma"
    ).value;

    try {
      // Faz uma requisição GET para gerar o cronograma do estudante
      const response = await fetch(`${API_URL}/cronograma/${estudanteNome}`);
      const data = await response.json(); // Extrai a resposta da API como JSON

      if (response.ok) {
        // Caso a resposta seja bem-sucedida
        const materias = data.materias; // Lista de matérias no cronograma

        // Monta o HTML da tabela do cronograma
        const tabela = `
          <h3>Cronograma de Estudos</h3>
          <p><strong>Estudante:</strong> ${estudanteNome}</p>
          <p><strong>Data de Criação:</strong> ${new Date(
            data.dataCriacao
          ).toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Matéria</th>
                <th>Tempo Alocado (horas)</th>
                <th>Estudada</th>
                <th>ID da Matéria</th>
                <th>Prioridade</th>
              </tr>
            </thead>
            <tbody>
              ${materias
                .map(
                  (materia) => `
                    <tr>
                      <td>${materia.nome}</td>
                      <td>${materia.tempoAlocado}</td>
                      <td>
                        <button class="btn-estudar" data-materia-id="${
                          materia._id
                        }" ${
                    materia.estudada
                      ? 'disabled style="cursor:not-allowed;"'
                      : ""
                  }>
                          ${
                            materia.estudada
                              ? "Estudada"
                              : "Marcar como Estudada"
                          }
                        </button>
                      </td>
                      <td>${materia._id}</td>
                      <td>${materia.prioridade}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>`;

        // Insere a tabela gerada no elemento de resultados
        document.getElementById("resultado-cronograma").innerHTML = tabela;

        // Adiciona eventos de "Marcar como Estudada" nos botões
        document.querySelectorAll(".btn-estudar").forEach((button) => {
          button.addEventListener("click", async () => {
            const materiaId = button.getAttribute("data-materia-id");
            try {
              const response = await fetch(
                `${API_URL}/materia/estudar/${materiaId}`,
                { method: "POST" }
              );
              const materiaAtualizada = await response.json();

              // Verifica se a requisição foi bem-sucedida
              if (response.ok) {
                alert("Matéria marcada como estudada!");
                button.innerText = "Estudada"; // Atualiza o texto do botão
                button.disabled = true; // Desativa o botão
                button.style.cursor = "not-allowed";
              } else {
                alert(
                  materiaAtualizada.message ||
                    "Erro ao marcar matéria como estudada"
                );
              }
            } catch (error) {
              alert("Erro ao conectar ao servidor");
            }
          });
        });
      } else {
        // Exibe uma mensagem de erro caso o cronograma não seja gerado
        document.getElementById("resultado-cronograma").innerHTML = `<p>${
          data.message || "Erro ao gerar cronograma"
        }</p>`;
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor"); // Mostra um alerta caso ocorra erro na conexão
    }
  });

// Função para exibir o tooltip com a descrição da prioridade
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um ouvinte de evento para todos os ícones de tooltip
  document.querySelectorAll(".tooltip-icon").forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      // Exibe o texto da tooltip em um alert
      const tooltipText =
        "A prioridade 1 é a mais alta e a prioridade 5 é a mais baixa.";
      if (tooltipText) {
        alert(tooltipText); // Exibe o texto da tooltip em um alert
      }
    });
  });
});

// Função para editar matéria no cronograma
document
  .getElementById("form-editar-materia")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos do formulário
    const materiaId = document.getElementById("materia-id").value;
    const novoTempo = document.getElementById("novo-tempo").value;
    const novaPrioridade = document.getElementById("nova-prioridade").value;

    // Valida se os campos estão preenchidos corretamente
    if (!materiaId || !novoTempo || !novaPrioridade) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      // Faz a requisição para editar a matéria no cronograma
      const response = await fetch(
        `${API_URL}/cronograma/editar/${materiaId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tempoAlocado: novoTempo,
            prioridade: novaPrioridade,
          }),
        }
      );
      const data = await response.json();

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        tempoAlocado = data.tempoAlocado;
        prioridade = data.prioridade;
        alert("Matéria atualizada com sucesso!");
        document.getElementById("form-editar-materia").reset(); // Limpa o formulário
      } else {
        alert(data.message || "Erro ao editar matéria");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
  });
