export class HandleError<M extends string, S extends number> extends Error {
    constructor(
        public message: M,
        public codeStatus: S
    ) {
        super(message);
    }
}