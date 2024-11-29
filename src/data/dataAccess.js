const MongoDBConnector = require("./MongoDBConnector");
const MySQLConnector = require("./MySQLConnector");

// Função que cria e retorna o conector de banco de dados apropriado
function createDatabaseConnection(dbType, connectionString) {
  switch (dbType) {
    case "mongodb":
      return new MongoDBConnector(connectionString);
    case "mysql":
      return new MySQLConnector(connectionString);
    default:
      throw new Error(`Tipo de banco de dados não suportado: ${dbType}`);
  }
}

module.exports = { createDatabaseConnection };
