export const AUTH_STATUS = {
    CHECKING: 0,
    AUTHORIZED: 1,
    UNAUTHORIZED: 2,
}

export const ROLE = {
    x: "Admin",
    t: "Tech. supp",
    d: "Dev. department",
    a: "Acc. management"
}

export const RULES = {
    "clients": {
        "GET": ["a", "x"],
        "POST": ["a", "x"],
        "PUT": ["a", "x"],
        "DELETE": ["a", "x"]
    },
    "contracts": {
        "GET": ["a", "x"],
        "POST": ["a", "x"],
        "PUT": ["a", "x"],
        "DELETE": ["a", "x"]
    },
    "appeals": {
        "GET": ["a", "t", "x"],
        "POST": ["a", "x"],
        "PUT": ["a", "x"],
        "DELETE": ["a", "x"]
    },
    "services": {
        "GET": ["d", "a", "x"],
        "POST": ["d", "x"],
        "PUT": ["d", "x"],
        "DELETE": ["d", "x"]
    },
    "tariffs": {
        "GET": ["d", "a", "x"],
        "POST": ["d", "x"],
        "PUT": ["d", "x"],
        "DELETE": ["d", "x"]
    },
    "jobs": {
        "GET": ["t", "x"],
        "POST": ["t", "x"],
        "PUT": ["t", "x"],
        "DELETE": ["t", "x"]
    },
    "workers": {
        "GET": ["t", "x"],
        "POST": ["t", "x"],
        "PUT": ["t", "x"],
        "DELETE": ["t", "x"]
    }
}