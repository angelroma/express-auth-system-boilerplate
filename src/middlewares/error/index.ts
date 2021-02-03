import {NextFunction, Request, Response} from "express";

const errorMiddleware =
    (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack)

        res.status(err.statusCode || 500)
            .json({
                success: false,
                error: err.message || "Error Desconocido"
            })
    }

export default errorMiddleware
