import DomainError from './domainError'

export default class InternalError extends DomainError {
    data: object;
    constructor(error: Error) {
        super(error.message);
        this.data = { error };
    }
}