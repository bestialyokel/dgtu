import DomainError from "./domainError";

export default class ResourceNotFoundError extends DomainError {
    data: object;
    constructor(details: string, query: object) {
        super(`Data is not valid: ${details}`);
        this.data = { details, query };
    }
}
