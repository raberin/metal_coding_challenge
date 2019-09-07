exports.up = function(knex, Promise) {
  return knex.schema.createTable("pairs", tbl => {
    tbl.increments();

    tbl
      .string("symbol", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pairs");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("ticker", tbl => {
    tbl.increments();

    tbl
      .string("symbol", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pairs");
};
