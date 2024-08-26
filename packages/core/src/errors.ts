export class TvmClientError extends Error {
    code: number;
    data?: any;
    
    constructor(code: number, message: string, data?: any) {
        super(message);
        this.code = code;
        this.data = data;
    }
}
