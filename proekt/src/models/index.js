class Model {
    constructor() {
        if (Object.getPrototypeOf(this) == Model.prototype) throw "Abstract class"
        const ThisClass = Object.getPrototypeOf(this)
        const ModelClass = Model.prototype

        ["getAll", "getOne", "updateOne", "deleteOne"].forEach(x => {
            if (ThisClass[x] == void(0)) 
                throw `${x} is undefined`
            if (ThisClass[x] == ModelClass[x]) 
                throw `${x} is virtual`
        })
    }
    getAll() {}
    getOne() {}
    updateOne() {}
    deleteOne() {}
}

module.exports = {Model}
