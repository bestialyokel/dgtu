const fs = require('fs')
const process = require('process')
const os = require('os')
let EOL = os.EOL;

let random = (min,max) => {
  return Math.ceil((max - min) * Math.random() + min)
}

let randGraph = n => {
  let graph = new Array(n).fill(new Array(n))
  graph[0][0] = 0
  graph[n-1][n-1] = 0
  for (let i = 1; i <= n - 1; i++) {
    graph[i][i] = 0
    let a = new Array(n).fill(0);
    for (let j = 0; j <= i - 1; j++) {
      let value = (Math.random() > 0.3) ? random(10,50) : 0
      a[j] = value
      graph[j][i] = value
    }
    graph[i] = a
  }
  return graph
}


class Prima {
  constructor(matrix) {
    this.matrix = matrix
  }
  minKey(key, mstSet) {
    let min_index
    let min = Number.MAX_VALUE
    for(let i = 0, length = this.matrix.length; i < length; i++) {
      if (key[i] < min && !mstSet[i]) {
        min = key[i]
        min_index = i
      }
    }
    return min_index
  }
  result() {
    let time = process.hrtime();
    let g = this.matrix;
    let minOst = Array(g.length).fill(Array(g.length))
    let length = g.length;
    let key = Array(length).fill(Number.MAX_VALUE)
    let parent = Array(length).fill(null)
    key[0] = 0
    parent[0] = 0
    let mstSet = Array(length).fill(false)
    for (let i = 0; i < length; i++) {
      let u = this.minKey(key,mstSet)
      mstSet[u] = true;
      for(let v = 0; v < length; v++) {
        if (g[u][v] > 0 && !mstSet[v] && key[v] > g[u][v]) {
          key[v] = g[u][v] 
          parent[v] = u
        }
      }
    }

    time = process.hrtime(time)
    fs.writeFileSync('result.txt', new Date() + EOL )
    fs.appendFileSync('result.txt', 'time : ' + (time[0] * 1e9  + time[1]) + ' nsec')
    fs.appendFileSync('result.txt', EOL + 'memory used : ' + (process.memoryUsage().heapUsed / (1024 * 1024)) + ' of ' + os.totalmem()/ (1024*1024) + ' mb')
    fs.appendFileSync('result.txt', EOL + 'cpu : ' + os.cpus()[0].model + ' x ' + os.cpus().length);
    fs.appendFileSync('result.txt', EOL + EOL + 'rebro(ves)')
    
    for (let i = 1; i < this.matrix.length; i++) {
      fs.appendFileSync('result.txt',EOL + parent[i] + '-' + i + '(' + this.matrix[i][ parent[i] ] + ')')
    }
  }
}

let graph = randGraph(1000)

new Prima(graph).result()



