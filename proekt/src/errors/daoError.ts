import InternalError from "./internalError";


export default class DaoError extends InternalError {
    constructor(error: Error) {
        super(error)
    }
}