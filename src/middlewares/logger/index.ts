import {NextFunction, Request, Response} from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('LOGGED')
    next()
}

export default loggerMiddleware;
