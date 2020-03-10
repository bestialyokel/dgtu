
class DB {
    constructor(Driver, config) {
        this.connection = new Driver(config);
    }
    
}