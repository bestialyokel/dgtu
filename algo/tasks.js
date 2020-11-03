
// O(nlogn+n) ~ O(nlogn)
//find out if there are 2 same nums
const twosame = (array) => {
    array = [...array]

    //O(nlogn)
    /*mergesort(array)

    for (let i = 0; i < array.length - 1; i++) {
        if (a[i] == a[i+1])
            return true
    }

    return false

    */
}

//1-3-7
//find out if X can be submited as (a+b) where a,b in Array O(nlogn)

const asSum = (array, X) => {
    /*
    array = [...array]
    mergesort(array)
    let lidx = 0
    let ridx = array.length - 1

    while (lidx < ridx) {
        if (array[lidx] + array[ridx] == X)
            return true

        //Сдвигаем индексы друг к другу
        (array[lidx] + array[ridx] < X) ? lidx++ : ridx--
    }

    return false
    
    */
}


//не запускал да короче
const inversions = (array, left = 0, right = array.length - 1) => {
    
    if (left == right)
        return

    const splitter = ((left + right)/ 2) << 0

    let l_inv = inversions(array, left, splitter)
    let r_inv = inversions(array, splitter+1, right)

    let tmp = Array(right - left + 1).fill()

    let lidx = left
    let ridx = splitter+1

    let inv = 0

    for (let i = left; i <= right; i++) {
        if ( (lidx <= splitter) && (ridx <= right) ) {
            if (array[lidx] < array[ridx]) {
                tmp[i] = array[lidx++]
            } else {
                tmp[i] = array[ridx++]

                inv += 1
            }
        }
        else if (lidx <= splitter) {
            tmp[i] = array[lidx++]

            inv += 1
        }
        else {
            tmp[i] = array[ridx++]
        }
    }

    for (let i = left; i <= right; i++) {
        array[i] = tmp[i - left]
    }

    return inv + l_inv + r_inv
}



