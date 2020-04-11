class View {
    constructor() {}

    show(model) {
        console.warn(model, "this is a virtual method")
    }
}

module.exports = {View}