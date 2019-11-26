
let s = [
    new Set([1, 3]),
    new Set([0, 2, 3, 4]),
    new Set([1, 4]),
    new Set([0, 1, 4, 5]),
    new Set([1, 2, 3, 5, 6]),
    new Set([3, 4, 6]),
    new Set([4, 5])
]

let ostov = (Graph) => {
    let span = Array(Graph.length);
    let difference = Array(Graph.length);

    for (let i = 0; i < span.length; i++) {
        span[i] = new Set();
        difference[i] = new Set();
    }

    let buildOST = (G, visited = new Set(), cur = 0, prev = 0) => {
        if (visited.has(cur)) {
            if (!span[cur].has(prev)) 
                difference[prev].add(cur);
            return;
        }
        visited.add(cur);
        span[prev].add(cur);
        G[cur].forEach(x => buildOST(G, visited, x, cur))
    }

    buildOST (Graph); disp
    span[0].delete(0);
    return {span, difference};
}



let b = ostov(s);

console.log(b); // 


