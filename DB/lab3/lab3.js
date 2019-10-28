const {exec, spawn} = require('child_process');

const output = 'result.txt';

const dbs = [
    '06_allauto.mdb',
]

const requests = [
    `SELECT "*" FROM MENU WHERE C_MENU="C" `,
]

const request = requests[0];
const db = dbs[0];


exec(`echo ${request} > ${output}`);

