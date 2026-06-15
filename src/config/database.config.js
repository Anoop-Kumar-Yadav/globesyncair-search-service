const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_TEST_NAME,
} = require("./config.js");

module.exports = {
  development: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || null,
    database: DB_NAME || "database_development",
    host: DB_HOST || "127.0.0.1",
    port: DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || null,
    database: DB_TEST_NAME || "database_test",
    host: DB_HOST || "127.0.0.1",
    port: DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || null,
    database: DB_NAME || "database_production",
    host: DB_HOST || "127.0.0.1",
    port: DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5, // not more than 5 simultaneous TCP connections to MySQL.
      min: 0, // okay to have 0 connection
      acquire: 30000, // After 30 seconds, Sequelize kills the waiting request and throws a ConnectionAcquireTimeoutError,prevents infinite hanging.
      idle: 10000, // If connection hasn't been used for 10,000 milliseconds (10 seconds), sever the TCP socket and close it.
    },
  },
};
