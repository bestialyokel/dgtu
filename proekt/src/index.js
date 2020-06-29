const { Pool } = require('pg')

const pool = new Pool({
    user: 'ddbachur',
    host: 'localhost',
    database: 'chat',
    password: 'g3mfcq4f',
    port: '5432'
})

;(async () => {
    try {
        let {rows} = await pool.query('SELECT * FROM Users');
        console.log(rows)
    } catch(error) {
        console.log(error.message);
        
    }
})()