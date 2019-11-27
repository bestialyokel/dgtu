
let s = [
    [ 1, 2, 3, 4 ],
    [0, 2, 3, 4],
    [0, 1, 3],
    [0, 1, 2],
    [0, 1]
]

let ostov = (Graph) => {
    let span = Array(Graph.length);
    let difference = Array(Graph.length);

    let cycles = [];



    for (let i = 0; i < span.length; i++) {
        span[i] = []
        difference[i] = []
    }

    let buildOST = (G, visited = [], cur = 0, prev = 0) => {
        if (visited.includes(cur)) {
            if (!span[cur].includes(prev) && !difference[cur].includes(prev))
                difference[prev].push(cur);
            return;
        }
        visited.push(cur);
        span[prev].push(cur);
        G[cur].forEach(x => buildOST(G, visited, x, cur))
    }

    buildOST (Graph);
    span[0].shift();

    let dfs = (G, visited = [], cur = 0, depth = 0) => {
        if (visited.includes(cur)) {
            visited.push(cur);
            while(visited[0] != cur) visited.shift();
            console.log(visited);
            return;
        }
        visited.push(cur);
        if (G[cur].length == 0) for (let i = 0; i < depth - 1; i++) visited.pop();
        G[cur].forEach(x => dfs(G, visited, x, depth + 1));
    }
    
    difference.forEach((x,i) => {
        x.forEach((y, j) => {
            console.log('----')

            let b = [...span[i]];
            let c = span[i];
            b.push(y);
            b.sort();
            span[i] = b;
            dfs(span);
            span[i] = c;
        

        })
    })

    return {span, difference};


}

let b = ostov(s);

