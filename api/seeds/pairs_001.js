exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("pairs")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("pairs").insert([
        { symbol: "BTCUSDT" },
        { symbol: "BTCBNB" },
        { symbol: "BTCTRX" }
      ]);
    });
};
