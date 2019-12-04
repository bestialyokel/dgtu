const db = require('../db/db')
const privileges = require('../privileges')

module.exports = async (req, res, next) => {
    const {key} = req.query
    let login = await db.query('SELECT * FROM Logins WHERE key=$1', [key])
    login = login.rows[0]
    if (login == null) {
        res.status(401).json({
            success: false,
            message: 'not logged in'
        })
        return
    }
    delete key


    if (!privileges['clients'][req.method].includes(login.role)) {
        res.status(403).json({
            success: false,
            message: 'not privileged'
        })
        return
    }

    if (req.method == 'GET') {
        const {id} = req.query;

        if (id) {
            let client = await db.query('SELECT * FROM Clients Cl\
                                            WHERE Cl.idclient=$1', [id])
            if (client.rows.length == 0) {
                res.status(200).json({
                    success: false,
                    message: 'client not found',
                })
                return
            }
            
            let contracts = await db.query('SELECT * FROM Contracts WHERE idcontract=$1', [client.rows[0].idclient])
            res.status(200).json({
                success: true,
                message: 'client and contracts available',
                client: client.rows[0],
                fields: client.fields.map(x => x.name),
                contracts: contracts.rows.map(x => x.idcontract)
            })
            return
        }

        let clients = await db.query('SELECT * FROM Clients');
        res.status(200).json({
            success: true,
            message: 'clients availabe',
            clients: clients.rows,
            fields: clients.fields.map(x => x.name)
        })
        return                                    
    }
    if (req.method == 'POST') {
        const {name, surname, patronymic, phonenumber} = req.query

        let create = await db.query('INSERT INTO Clients VALUES (DEFAULT, $1, $2, $3, $4) RETURNING idclient', 
                                    [name, surname, patronymic, phonenumber]);

        res.status(200).json({
            success: true,
            message: 'client created',
            idclient: create.rows[0].idclient
        })

        return
    }
    if (req.method == 'PUT') {
        const {id, name, surname, patronymic, phonenumber} = req.query

        let update = await db.query('UPDATE Clients SET name=$1, surname=$2, patronymic=$3, phonenumber=$4 \
                                        WHERE idclient=$5 RETURNING idclient',
                                        [name, surname, patronymic, phonenumber, id])

        if (update.rows.length == 0) {
            res.status(200).json({
                success: false,
                message: 'client does not exist'
            })
            return
        }

        res.status(200).json({
            success: true,
            message: 'client was updated',
            idclient: update.rows[0].idclient
        })
        return
    }
    if (req.method == 'DELETE') {
        let {id} = req.query

        let del = await db.query('DELETE FROM Clients WHERE idclient=$1 RETURNING idclient', [id])

        if (del.rows.length == 0) {
            res.status(200).json({
                success: false,
                message: 'client not found',
            })
            return
        }

        res.status(200).json({
            success: true,
            message: 'user was deleted'
        })
        return

    }

}