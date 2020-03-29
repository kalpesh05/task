const dotenv = require("dotenv");
const config = require("./config");
dotenv.config({ path: `.env` });
console.log(process.env.DB_NAME);
let connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
module.exports = {
  client: "mysql",
  connection: connection,
  pool: { min: 2, max: 7 },
  acquireConnectionTimeout: 60000,
  migrations: {
    tableName: "migrations"
  }
};
