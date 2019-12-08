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

    if (!privileges['contracts'][req.method].includes(login.role)) {
        res.status(403).json({
            success: false,
            message: 'not privileged'
        })
        return
    }

    if (req.method == 'GET') {
        let {id} = req.query

        if (id) {
            let contract = await db.query('SELECT * FROM Contracts \
                                            WHERE idcontract=$1', [id])
            if (contract.rows.length == 0) {
                res.status(200).json({
                    success: false,
                    message: 'contract not found'
                })
                return
            }

            let appeals = await db.query('SELECT * FROM Appeals \
                                            WHERE idcontract=$1', 
                                            [contract.rows[0].idcontract])
            res.status(200).json({
                success: true,
                message: 'contract and appeals available',
                contract: contract0.row[0],
                fields: client.fields.map(x => x.name),
                appeals: appeals.rows.map(x => x.idappeal)
            })

            return
        }

        let contracts = await db.query('SELECT * FROM Contracts')


        res.status(200).json({
            success: true,
            message: 'contracts available',
            contracts: contracts.rows,
            fields: contracts.fields.map(x => x.name)
        })
        return
    }
    if (req.method == 'POST') {
        let {idclient, idtariff, address, type} = req.query

        let create = await db.query('INSERT INTO Contracts VALUES \
                                        (DEFAULT, $1, $2, $3, $4, NOW()) RETURNING idcontract',
                                        [idclient, idtariff, address, type])
        if (create.rows.length == 0) {
            res.status(200).json({
                success: false,
                message: 'invalid data' 
            })
            return
        }

        res.status(200).json({
            success: true,
            message: 'contract created',
            idcontract: create.rows[0].idcontract
        })
        return
    }
    if (req.method == 'PUT') {
        let {id, idtariff} = req.query

        let update = await db.query('UPDATE Contracts SET idtariff=$1 WHERE idcontract=$2 RETURNING idcontract', 
                                    [idtariff, id])

        if (update.rows.length == 0) {
            res.json({
                success: false,
                message: 'invalid contract or tariff',
            })
            return
        }

        res.json({
            success: true,
            message: 'contract updated',
            idcontract: update.rows[0].idcontract
        })

        return
    }
    if (req.method == 'DELETE') {
        let {id} = req.query

        let del = await db.query('DELETE FROM Contracts WHERE idcontract=$1 RETURNING idclient', [id])

        if (del.rows.length == 0) {
            res.json({
                success: false,
                message: 'contract does not exist'
            })
            return
        }

        res.json({
            success: true,
            message: 'contract deleted',
            idclient: del.row[0].idclient
        })
        return
    }
}