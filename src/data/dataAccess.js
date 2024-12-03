const MongoDBConnector = require("./MongoDBConnector");
const MySQLConnector = require("./MySQLConnector");

// Função que cria e retorna o conector de banco de dados apropriado
function createDatabaseConnection(dbType) {
  switch (dbType) {
    case "mongodb":
      return new MongoDBConnector();
    case "mysql":
      return new MySQLConnector();
    default:
      throw new Error(`Tipo de banco de dados não suportado: ${dbType}`);
  }
}

module.exports = { createDatabaseConnection };
