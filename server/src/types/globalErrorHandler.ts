

export class GlobalErrorHandler extends Error {

    statusCode:number = 400;

    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode=statusCode;
    }

}