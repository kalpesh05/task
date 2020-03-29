exports.up = function(knex, _Promise) {
  return knex.schema.createTable("task", function(table) {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.string("desciption", 250).notNullable();
    table.timestamp("created").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updateAt")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

exports.down = function(knex, _Promise) {};
