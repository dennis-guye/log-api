export const hasOwnProperty = <X, Y extends PropertyKey>(p: X, prop: Y): p is X & Record<Y, unknown> =>{ 
    return !!p && typeof p === 'object' && Object.hasOwn(p, 'message')
}

export class StatusError extends Error {
    constructor(readonly message: string, readonly code: number, readonly status: string){
        super(message);
        this.name= 'StatusError'
    }
}