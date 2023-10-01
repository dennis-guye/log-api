"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = exports.hasOwnProperty = void 0;
const hasOwnProperty = (p, prop) => {
    return !!p && typeof p === 'object' && Object.hasOwn(p, 'message');
};
exports.hasOwnProperty = hasOwnProperty;
class StatusError extends Error {
    message;
    code;
    status;
    constructor(message, code, status) {
        super(message);
        this.message = message;
        this.code = code;
        this.status = status;
        this.name = 'StatusError';
    }
}
exports.StatusError = StatusError;
