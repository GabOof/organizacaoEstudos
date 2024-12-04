const API_URL = "http://localhost:3000"; // URL base da API

// Variável global para armazenar o ID do estudante
let estudanteId = null;

// Função para enviar dados do formulário de estudante
document
  .getElementById("form-estudante")
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
        console.log("Estudante criado:", data);
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

    if (!estudanteId) {
      alert("Por favor, cadastre um estudante primeiro!");
      return;
    }

    try {
      // Faz uma requisição POST para criar uma matéria associada ao estudante
      const response = await fetch(`${API_URL}/materia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define o cabeçalho como JSON
        body: JSON.stringify({
          nome,
          prioridade,
          tempoEstimado,
          estudanteId, // Adiciona o ID do estudante
        }), // Corpo da requisição com os dados da matéria
      });
      const data = await response.json(); // Extrai a resposta da API como JSON

      if (response.ok) {
        alert("Matéria salva com sucesso!"); // Informa o usuário sobre o sucesso
        console.log("Matéria criada:", data); // Loga a resposta da API para depuração
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
            </tr>
          </thead>
          <tbody>
            ${materias
              .map(
                (materia) => `
              <tr>
                <td>${materia.nome}</td>
                <td>${materia.tempoAlocado}</td>
              </tr>`
              )
              .join("")} <!-- Gera dinamicamente as linhas da tabela -->
          </tbody>
        </table>
      `;
        // Insere a tabela gerada no elemento de resultados
        document.getElementById("resultado-cronograma").innerHTML = tabela;
      } else {
        // Exibe uma mensagem de erro caso o cronograma não seja gerado
        document.getElementById("resultado-cronograma").innerHTML = `
        <p>${data.message || "Erro ao gerar cronograma"}</p>
      `;
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor"); // Mostra um alerta caso ocorra erro na conexão
    }
  });
