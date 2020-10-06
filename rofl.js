

const line = 3;
const rows = 2;

const ornWidth = 5;
const ornHeight = 4;

const w = line * ornWidth;
const h = rows * (ornHeight + 1);

const matrix = Array(h).fill()
                .map(x => Array(w).fill("?"))

    

for (let i = 0; i < h; i ++) {
    for (let j = 0; j < w; j ++) {

        if ((j - i) % 5 == 0) {
            matrix[i][j] = "O"
            continue;
        } 

    }
}

console.log(matrix.map(x => x.join('') ));
