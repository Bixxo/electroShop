const { Client } = require('pg');

const getConnection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'electroshop'
    })
    await client.connect();
    return client;
}

module.exports = getConnection;