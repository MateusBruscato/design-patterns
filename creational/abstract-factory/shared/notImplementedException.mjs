export default class NotImplementedException extends Error {
    constructor(message) {
        super(`The method ${message} was not implemented`);
        this.name = "NotImplementedException";
    }
}