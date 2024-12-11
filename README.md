# **Organizador de Estudos**

## **Autores**

- [Gabrielle de Oliveira Fonseca](https://github.com/GabOof);
- [Gabrielly Vitória](https://github.com/GabriellyVitoria5).

## **Descrição**

Este projeto é um sistema simples para ajudar estudantes a organizarem seu tempo de estudo de forma eficiente. Ele utiliza uma **Arquitetura em Camadas** e é desenvolvido em **JavaScript**, abordando conceitos de boas práticas como os **princípios SOLID**.

### **Funcionalidades**

1. Cadastro de estudantes.
2. Cadastro de matérias.
3. Geração de cronogramas de estudo personalizados.
4. Marcar matérias como estudadas.
5. Edição de informações das matérias (tempo alocado e prioridade).
6. Exibição de descrições de prioridade (tooltip).

---

## **Como executar o projeto**

### **1. Pré-requisitos**

- **Node.js** (v20.12.1) -> [Node.js](https://nodejs.org/);
- **MongoDB** (v6.0) -> [MongoDB](https://www.mongodb.com/try/download/community);
- **MongoDB Compass** -> [MongoDB Compass](https://www.mongodb.com/try/download/compass);
- **Live Server** ou outro servidor local para executar a interface web -> [Live Server - VSCode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

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
   ```

3. **Configure o MongoDB:**
   Este projeto utiliza o MongoDB para armazenar os dados. Certifique-se de ter o MongoDB em funcionamento localmente. Caso não tenha, siga as instruções de instalação no site oficial do [MongoDB](https://www.mongodb.com/pt-br/docs/manual/administration/install-community/#std-label-install-mdb-community-edition).

4. **Inicie o servidor:**
   Execute o servidor com o seguinte comando:

   ```bash
   node main.js
   ```

   O servidor estará rodando em `http://localhost:3000`.

5. **Acesse a interface web:**
   Abra o arquivo `index.html` na pasta `view` em seu navegador ou utilize um servidor local como o Live Server ou similar.

---

## **Como Usar (Utilizando a Interface Web)**

### **1. Cadastro de Estudante**

- **Nome do Estudante**: Insira o nome do estudante;
- **Tempo Disponível**: Informe o tempo disponível do estudante em horas.

### **2. Cadastro de Matérias**

- **Nome do Estudante**: Insira o nome do estudante para o qual deseja criar uma matéria;
- **Nome da Matéria**: Insira o nome da matéria;
- **Prioridade**: Selecione a prioridade da matéria (1, 2, 3, 4 ou 5). Utilize o botão de informação para ver a descrição de prioridade;
- **Tempo Estimado**: Informe o tempo estimado de estudo da matéria em horas.

### **3. Gerar Cronograma**

- **Estudante**: Insira o nome do estudante cadastrado que você deseja gerar o cronograma;
- **Cronograma Gerado**: O cronograma será exibido na tela com as matérias, o tempo alocado para cada uma, o botão para marcar se ela foi ou não estudada, o ID da matéria e sua prioridade.

### **4. Marcar Matéria como Estudada**

- **Botão de Estudada**: Clique no botão para marcar a matéria como estudada. Essa matéria ficará bloqueada no cronograma, impossibilitando sua edição futura.

### **5. Edição de Matérias**

- **ID da Matéria**: Insira o ID da matéria que deseja editar;
- **Tempo Alocado**: Informe o novo tempo alocado para a matéria;
- **Prioridade**: Selecione a nova prioridade da matéria (1, 2, 3, 4 ou 5);
- Após editar, clique no botão "Gerar Cronograma" para visualizar as alterações no cronograma.

---

## **Princípios SOLID Aplicados**

<!-- TODO: precisamos citar quais os princípios e explicar onde estão -->
