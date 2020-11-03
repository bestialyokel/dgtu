
const array = [1,4,1,52,5,12,612,124,1,412,6]

//Также существует алгоритм без дополнительной памяти.
const merge_sort = (array, left_index = 0, right_index = array.length - 1) => {

    //можно доходя до длины ~6-7 сортировать вставками
    if (left_index == right_index)
        return

    const splitter = (right_index + left_index ) / 2 << 0

    merge_sort(array, left_index, splitter)
    merge_sort(array, splitter + 1, right_index)

    let tmp = Array(right_index - left_index + 1).fill(0)

    //left & right start
    let lidx = left_index
    let ridx = splitter + 1

    const left_end = ridx - 1

    //Как с колодой карт, сравниваем 2 верхних, берем меньшуюю
    //Если какая-то колода закончилась, докидываем остальные
    for (let i = 0; i < tmp.length; i++) {
        if ((lidx <= left_end) && (ridx <= right_index)) {
            array[lidx] < array[ridx] ? tmp[i] = array[lidx++] : tmp[i] = array[ridx++] 
        }
        else if (lidx <= left_end) {
            tmp[i] = array[lidx++]
        }
        else {
            tmp[i] = array[ridx++]
        }
    }

    for (let i = left_index; i <= right_index; i++) {
        array[i] = tmp[i - left_index]
    }
}

let x = merge_sort(array)

console.log(array)

/*
let tmp = Array(ridx - lidx + 1)

    for (let i = 0; i < tmp.length; i++) {
        if (lidx < left_index && ridx < right_index) {
            array[lidx] < array[lidx] ? tmp[i] = array[lidx++] : tmp[i] = array[ridx++]
        } 
        else if (lidx < left_index) {
            tmp[i] = array[lidx++]
        } else {
            tmp[i] = array[ridx++]
        }
    }

    let idx = 0
    for (let i = left_tmp; i < right_index + 1; i++) {
        array[i] = tmp[idx++]
    }
*/