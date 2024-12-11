const EstudanteDAOInterface = require('./EstudanteDAOInterface');

// Criação de tabelas de estudantes
const createTableAluno = `
  CREATE TABLE IF NOT EXISTS estudantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tempoDisponivel INT NOT NULL
  );
`;

class EstudanteDAOMySQL extends EstudanteDAOInterface {
    constructor(pool) {
        super(); // Chama o construtor da interface

        if (!pool) {
            throw new Error("Pool de conexão MySQL é obrigatório.");
        }

        this.pool = pool;
        this.criarTabelaEstudantes();
    }

    // Criar a tabela estudantes no banco
    async criarTabelaEstudantes() {
        try {
            await this.pool.execute(createTableAluno);
            //console.log("Tabela 'estudantes' verificada/criada com sucesso.");
        } catch (error) {
            console.error("Erro ao criar/verificar tabela 'estudantes':", error.message);
            throw error;
        }
    }

    // Salvar um estudante no banco de dados
    async salvarEstudante(estudante) {
        const query = `INSERT INTO estudantes (nome, tempoDisponivel) VALUES (?, ?)`;
        const params = [estudante.nome, estudante.tempoDisponivel];

        try {
            const [result] = await this.pool.execute(query, params);
            return result.insertId; // Retorna o ID do estudante inserido
        } catch (error) {
            console.error("Erro ao salvar estudante:", error.message);
            throw error;
        }
    }

    // Buscar estudante pelo nome no banco de dados
    async buscarEstudantePorNome(nome) {
        const query = `SELECT * FROM estudantes WHERE nome = ?`;
        const params = [nome];

        try {
            const [rows] = await this.pool.execute(query, params);
            return rows; // Retorna os estudantes encontrados
        } catch (error) {
            console.error("Erro ao buscar estudante por nome:", error.message);
            throw error;
        }
    }

    // Buscar estudante pelo ID no banco de dado mysql
    async buscarEstudantePorId(id) {
        const query = `SELECT * FROM estudantes WHERE id = ?`;
        const params = [id];

        try {
            const [rows] = await this.pool.execute(query, params);
            return rows.length ? rows[0] : null; // Retorna o estudante ou null se não encontrado
        } catch (error) {
            console.error("Erro ao buscar estudante por ID:", error.message);
            throw error;
        }
    }
}

module.exports = EstudanteDAOMySQL;
