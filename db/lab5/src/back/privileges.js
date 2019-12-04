module.exports = {
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