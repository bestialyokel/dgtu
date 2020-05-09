const { execSync } = require('child_process');

//const query = 'pg_dump -h localhost -p 5432 -U ddbachur -d provider -Fc > ./archive/db_$(date +%Y-%m-%d:%k:%M:%S).dump'

const makeDump = ({host, port, username, dbname, dumpDestination}) => {
    const query = `pg_dump -h ${host} -p ${port} -U ${username} -d ${dbname} -Fc > ${dumpDestination}`
    let x = execSync(query)
    return x
}

// pg_restore -h 188.225.76.56 -U user_1 -c -F c -d dima_lab5 $1

const makeRestore = ({host, port, username, dbname, dumpSource}) => {
    //const query = `pg_restore -h ${host} -U ${username} -c -F c -d ${dbname} ${dumpSource}`
    const query = `pg_restore -h ${host} -p ${port} -U ${username} -c -F c -d ${dbname} ${dumpSource}`
    let x = execSync(query)
    return x
}


module.exports = {makeDump, makeRestore}