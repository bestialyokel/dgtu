const pool = require('./db/pool')

//t - technical, d - development, a - account mngmt.
const policyObj = {
    workers: {
        'POST': ['t'],
        'GET': ['t'],
        'PUT': ['t'],
        'DELETE': ['t']
    },
    services: {
        'POST': ['d'],
        'GET': ['d', 'a'],
        'PUT': ['d'],
        'DELETE': ['d']
    },
    tariffs: {
        'POST': ['d'],
        'GET': ['d', 'a'],
        'PUT': ['d'],
        'DELETE': ['d']
    },
    clients: {
        'POST': ['a'],
        'GET': ['a'],
        'PUT': ['a'],
        'DELETE': ['a']
    },
    contracts: {
        'POST': ['a'],
        'GET': ['a'],
        'PUT': ['a'],
        'DELETE': ['a']
    },
    appeals: {
        'POST': ['a'],
        'GET': ['a', 't'],
        'PUT': ['a'],
        'DELETE': ['a']
    },
    jobs: {
        'POST': ['t'],
        'GET': ['t'],
        'PUT': ['t'],
        'DELETE': ['t']
    }
}

module.exports = async (req, res, next) => {
    try {
        
        //*parse* top path
        let subject = req._parsedUrl.pathname
        for (let i = 1; i < subject.length; i++) {
            if (subject[i] == '/') {
                subject = subject.slice(0, i)
                break
            }
        }
        subject = subject.slice(1);

        if (subject == 'login') {
            next()
            return
        }


        let {key} = req.query
        let query = {
            text: 'SELECT * FROM Logins WHERE key=$1',
            values: [key]
        }
        let check = await pool.query(query)

        //not logged
        if (check.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not logged in'
            })
            return
        }

        //no rule for this subj.
        if (policyObj[subject] == null) {
            res.status(404)
            return
        }
        let role = check.rows[0].role
        
        //not privileged
        if (!policyObj[subject][req.method].includes(role)) {
            res.json({
                success: false,
                msg: 'not privileged'
            })
            return
        }

        // if everything is ok -> go next
        next()
    } finally {
        //pool.release()
    }
}