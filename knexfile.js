// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/metal_coding_challenge",
    migrations: {
      directory: __dirname + "/api/migrations"
    },
    seeds: {
      directory: __dirname + "/api/seeds"
    }
  },
  testing: {
    client: "pg",
    connection: "postgres://localhost/metal_coding_challenge_test",
    migrations: {
      directory: __dirname + "/api/migrations"
    },
    seeds: {
      directory: __dirname + "/api/seeds"
    }
  }
};
