let Graph = {
    'A': ['B','D'],
    'B': ['E', 'A', 'C', 'D'],
    'C': ['B','E'],
    'D': ['A', 'B', 'E', 'F'],
    'E': ['B', 'C', 'D', 'F', 'G'],
    'F': ['D', 'E', 'G'],
    'G': ['E', 'F'],
}

let DFS = (G, used = {}) => {
    let DFShelper = (u, log = '') => {
        if (used[u]) {
            if (log.length > 1 && log[log.length - 2] != u && log.includes(u)) console.log(log + u)
            return;
        }
        used[u] = true
        log += u;
        G[u].forEach(w => DFShelper(w, log))
    }
    for (v in G) DFShelper(v)
}


let a = DFS(Graph);

console.log(a);