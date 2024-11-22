# **Organizador de Estudos**

## **Descrição**
Este projeto é um sistema simples para ajudar estudantes a organizarem seu tempo de estudo de forma eficiente. Ele utiliza uma **Arquitetura em Camadas** e é desenvolvido em **JavaScript**, abordando conceitos de boas práticas como os **princípios SOLID**.

### **Funcionalidades**
1. Cadastro de matérias com prioridade e tempo estimado de estudo.
2. Geração de um cronograma sugerido com base no tempo disponível do estudante.
3. Interface simples para visualizar o cronograma gerado.

---

## **Estrutura do Projeto**
```
src/
├── models/               # Camada de Modelo (abstração do domínio)
│   ├── materia.js        # Representa uma matéria de estudo
│   ├── cronograma.js     # Representa o cronograma gerado
│   └── estudante.js      # Representa o estudante
├── controllers/          # Camada de Controle (regras de negócio)
│   └── cronogramaController.js
├── data/                 # Camada de Acesso a Dados
│   └── dataAccess.js
├── views/                # Camada de Interface (visualização)
│   └── index.html
└── main.js               # Arquivo principal
```

---

## **Como Executar o Projeto**

### **1. Pré-requisitos**
- Navegador web moderno que suporte JavaScript ES6.

### **2. Passos para Rodar**
1. **Clone este repositório:**
   ```bash
   git clone https://github.com/GabOof/organizacaoEstudos.git
   cd organizadorEstudos
   ```

2. **Abra o arquivo `index.html` no navegador:**
   Basta abrir o arquivo diretamente ou usar uma extensão para rodar um servidor local, como o **Live Server** no VS Code.

---

## **Como Usar**

1. **Defina o tempo disponível do estudante no código:**
   No arquivo `main.js`, ajuste o seguinte trecho para a quantidade de horas disponíveis:
   ```javascript
   dataAccess.salvarEstudante(new Estudante("Nome do Estudante", <TEMPO_DISPONÍVEL>));
   ```

2. **Adicione matérias:**
   - Preencha o formulário com:
     - Nome da matéria.
     - Prioridade (1-Alta, 2-Média, 3-Baixa).
     - Tempo estimado (em horas).
   - Clique no botão "Adicionar Matéria".

3. **Gere o cronograma:**
   - Após cadastrar as matérias, clique no botão "Gerar Cronograma".
   - O cronograma será exibido como uma lista com as matérias e o tempo alocado.

---

## **Exemplo de Uso**
- **Entrada:**
  - Matérias:
    - Matemática (Prioridade: 1, Tempo Estimado: 5h)
    - História (Prioridade: 2, Tempo Estimado: 3h)
  - Tempo disponível: 6 horas.

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
Sinta-se à vontade para abrir *issues* ou enviar *pull requests*. Sugestões e melhorias são bem-vindas!