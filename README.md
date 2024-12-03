# **Organizador de Estudos**

## **Descrição**

Este projeto é um sistema simples para ajudar estudantes a organizarem seu tempo de estudo de forma eficiente. Ele utiliza uma **Arquitetura em Camadas** e é desenvolvido em **JavaScript**, abordando conceitos de boas práticas como os **princípios SOLID**.

### **Funcionalidades**

1. Cadastro de matérias com prioridade e tempo estimado de estudo.
2. Geração de um cronograma sugerido com base no tempo disponível do estudante.
3. Interface web (utilizando [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ou similar).

---

## **Estrutura do Projeto**

```
src/
├── controllers/          # Camada de Controle (regras de negócio)
│   └── cronogramaController.js
├── data/                 # Camada de Acesso a Dados
│   └── dataAccess.js
|   └── estudanteDAO.js
|   └── materiaDAO.js
├── models/               # Camada de Modelo (abstração do domínio)
│   ├── cronograma.js
│   ├── estudante.js
│   └── materia.js
├── view/               # Camada de Visualização (interface web)
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── main.js               # Arquivo principal (servidor)
└── package.json          # Dependências do projeto
```

---

## **Como Executar o Projeto**

### **1. Pré-requisitos**

- **Node.js** e **NPM** instalados. Se não tiver, baixe e instale [Node.js](https://nodejs.org/).

### **2. Passos para Rodar**

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/GabOof/organizacaoEstudos.git
   cd organizadorEstudos
   ```

2. **Instale as dependências:**
   Execute o comando abaixo para instalar as dependências do projeto:

   ```bash
   npm install
   npm install cors
   ```

3. **Configure o MongoDB:**
   Este projeto utiliza o MongoDB para armazenar os dados. Certifique-se de ter o MongoDB em funcionamento localmente ou utilize um serviço em nuvem (como o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

4. **Inicie o servidor:**
   Execute o servidor com o seguinte comando:

   ```bash
   node main.js
   ```

   O servidor estará rodando em `http://localhost:3000`.

5. **Acesse a interface web:**
   Abra o arquivo `index.html` na pasta `view` em seu navegador ou utilize um servidor local como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do Visual Studio Code.

---

## **Como Usar (Utilizando a Interface Web)**

### **1. Cadastro de Estudante**

- **Nome do Estudante**: Insira o nome do estudante.
- **Tempo Disponível**: Informe o tempo disponível do estudante em horas.

### **2. Cadastro de Matérias**

- **Nome da Matéria**: Insira o nome da matéria.
- **Prioridade**: Selecione a prioridade da matéria.
- **Tempo Estimado**: Informe o tempo estimado de estudo da matéria em horas.

### **3. Gerar Cronograma**

- **Estudante**: Selecione o nome do estudante cadastrado.
- **Gerar Cronograma**: Clique no botão para gerar o cronograma de estudos.
- **Cronograma Gerado**: O cronograma será exibido na tela com as matérias e o tempo alocado para cada uma.

## **Como Usar (Testando via Postman)**

### **1. Criar um Estudante**

- **Método**: `POST`
- **Endpoint**: `http://localhost:3000/estudante`
- **Corpo da Requisição (JSON)**:

  ```json
  {
    "nome": "Nome do Estudante",
    "tempoDisponivel": 6
  }
  ```

  - **Exemplo**:

    ```json
    {
      "nome": "Teste",
      "tempoDisponivel": 6
    }
    ```

  - **Resposta Esperada**:
    ```json
    {
      "_id": "64791f809d89d105f8c2b515",
      "nome": "Teste",
      "tempoDisponivel": 6
    }
    ```

### **2. Criar uma Matéria**

- **Método**: `POST`
- **Endpoint**: `http://localhost:3000/materia`
- **Corpo da Requisição (JSON)**:

  ```json
  {
    "nome": "Matéria",
    "prioridade": 1,
    "tempoEstimado": 5
  }
  ```

  - **Exemplo**:

    ```json
    {
      "nome": "História",
      "prioridade": 2,
      "tempoEstimado": 3
    }
    ```

  - **Resposta Esperada**:
    ```json
    {
      "_id": "64791f809d89d105f8c2b516",
      "nome": "História",
      "prioridade": 2,
      "tempoEstimado": 3
    }
    ```

### **3. Gerar Cronograma**

- **Método**: `GET`
- **Endpoint**: `http://localhost:3000/cronograma/:estudanteNome`
- Substitua `:estudanteNome` pelo nome do estudante cadastrado (ex: `Teste`).
- **Exemplo de Endpoint**: `http://localhost:3000/cronograma/Teste`

  - **Resposta Esperada**:
    ```json
    [
      {
        "nome": "Matemática",
        "tempoAlocado": 5
      },
      {
        "nome": "História",
        "tempoAlocado": 1
      }
    ]
    ```

---

## **Exemplo de Uso**

- **Entrada:**

  - Estudante:
    - Nome: "Teste"
    - Tempo Disponível: 6 horas.
  - Matérias:
    - Matemática (Prioridade: 1, Tempo Estimado: 5h)
    - História (Prioridade: 2, Tempo Estimado: 3h)

- **Saída (Cronograma Gerado):**
  - Matemática: 5 horas.
  - História: 1 hora.

---

## **Princípios SOLID Aplicados**

1. **SRP (Princípio da Responsabilidade Única):**

   - Cada classe possui uma única responsabilidade, como gerenciar matérias, gerar cronogramas ou acessar dados.

2. **OCP (Princípio Aberto/Fechado):**

   - A lógica de regras de negócio no controlador pode ser expandida sem modificar o código existente.

3. **DIP (Princípio da Inversão de Dependência):**
   - O controlador não depende diretamente dos dados, utilizando o `DataAccess` para obter informações.

---

## **Contribuições**

Sinta-se à vontade para abrir _issues_ ou enviar _pull requests_. Sugestões e melhorias são bem-vindas!
