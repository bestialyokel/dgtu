import DomainError from "./domainError";


export default class ResourceNotFoundError extends DomainError {
    data: object;
    constructor(resource: string) {
        super(`Resource not found: ${resource}`);
        this.data = { resource };
    }
}

