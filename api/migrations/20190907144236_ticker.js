exports.up = function(knex, Promise) {
  return knex.schema.createTable("ticker", tbl => {
    tbl.increments();

    tbl
      .integer("symbol_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pairs")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.json("data");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("ticker");
};
