export class RequestError extends Error {
    constructor(status, msg = '', options = {}) {
        super(msg, options);
        this.status = status;
    }
}