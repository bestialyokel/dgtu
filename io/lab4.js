
let s = [
    [ 1, 2, 3, 4 ],
    [0, 2, 3, 4],
    [0, 1, 3],
    [0, 1, 2],
    [0, 1]
]

let ostov = (Graph) => {
	//тут будет остовное дерево
    let span = Array(Graph.length);
    
    //тут будет то что осталось от графа, если убрать из него дерево
    let difference = Array(Graph.length);



	//просто заполнение массивов массивами
    for (let i = 0; i < span.length; i++) {
        span[i] = []
        difference[i] = []
    }
	
	//функция которая строит остовное дерево
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
    
	//функция которая находит цикл
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
    
    
    //для каждого ребра из разницы найти цикл вроде
    difference.forEach((x,i) => {
        x.forEach((y, j) => {

            let b = [...span[i]];
            let c = span[i];
            
            b.push(y);
           
            b.sort();
            
            span[i] = b;
            dfs(span);
            span[i] = c;
        

        })
    })


}

let b = ostov(s);

