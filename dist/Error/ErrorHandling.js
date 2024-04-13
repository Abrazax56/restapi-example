export class HandleError extends Error {
    message;
    codeStatus;
    constructor(message, codeStatus) {
        super(message);
        this.message = message;
        this.codeStatus = codeStatus;
    }
}
