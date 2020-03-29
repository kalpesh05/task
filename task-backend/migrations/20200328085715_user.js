const { cryptoPassword } = require("../server/common/commonFunction");
exports.up = function(knex, _Promise) {
  const insertTable = knex.schema
    .createTable("user", function(table) {
      table.increments("id").primary();
      table
        .string("email", 100)
        .unique()
        .notNullable();
      table.string("password", 100).notNullable();
      table.string("firstName", 100);
      table.string("lastName", 100);
      table.string("salt", 100).notNullable();
      table.string("token", 500);
      table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .timestamp("updateAt")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .then();

  const insertData = insertTable.then(function() {
    const saltpassword = cryptoPassword(null, "test@005");
    const data = [
      {
        email: "test@gmail.com",
        password: saltpassword.cryptoPassword,
        firstName: "test",
        lastName: "test",
        salt: saltpassword.salt
      }
    ];

    return knex("user").insert(data);
  });

  return Promise.all([insertTable, insertData]);
};

exports.down = function(knex, Promise) {};
