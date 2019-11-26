module.exports = {
    t: {
      workers: ['read', 'write', 'delete'],
      jobs: ['read', 'write', 'delete'],
      appeals: ['read', 'write', 'delete'],
    },
    c: {
      clients: ['read', 'write', 'delete'],
      contracts: ['read', 'write', 'delete'],
    },
    r: {
      services: ['read', 'write', 'delete'],
      tariffs: ['read', 'write', 'delete'],
    }
}