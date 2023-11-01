const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "customers",
    password: "yahya1234"
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
