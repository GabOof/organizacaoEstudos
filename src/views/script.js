const API_URL = "http://localhost:3000";

// Função para enviar dados do formulário de estudante
document
  .getElementById("form-estudante")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome-estudante").value;
    const tempoDisponivel = document.getElementById("tempo-disponivel").value;

    try {
      const response = await fetch(`${API_URL}/estudante`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, tempoDisponivel }),
      });
      const data = await response.json();
      alert("Estudante salvo com sucesso!");
      console.log(data);
    } catch (error) {
      alert("Erro ao salvar estudante");
    }
  });

// Função para enviar dados do formulário de matéria
document
  .getElementById("form-materia")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome-materia").value;
    const prioridade = document.getElementById("prioridade").value;
    const tempoEstimado = document.getElementById("tempo-estimado").value;

    try {
      const response = await fetch(`${API_URL}/materia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, prioridade, tempoEstimado }),
      });
      const data = await response.json();
      alert("Matéria salva com sucesso!");
      console.log(data);
    } catch (error) {
      alert("Erro ao salvar matéria");
    }
  });

// Função para gerar cronograma
document
  .getElementById("form-cronograma")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const estudanteNome = document.getElementById(
      "nome-estudante-cronograma"
    ).value;

    try {
      const response = await fetch(`${API_URL}/cronograma/${estudanteNome}`);
      const data = await response.json();

      if (response.ok) {
        const materias = data.materias;
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
              .join("")}
          </tbody>
        </table>
      `;
        document.getElementById("resultado-cronograma").innerHTML = tabela;
      } else {
        document.getElementById("resultado-cronograma").innerHTML = `
        <p>${data.message || "Erro ao gerar cronograma"}</p>
      `;
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
  });
