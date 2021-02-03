import express, {NextFunction, Request, Response} from "express";
import {asyncHandler} from "../../middlewares";
import {login, signup, verifyAccount} from "./services";
import {IAuthLoginParams, IAuthSignupParams, IAuthVerifyParams} from "./interfaces";

const router = express.Router();

router.post('/login', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const params = req.body as IAuthLoginParams;
    const user = await login(params);
    res.status(200).json(user);
}))

router.post('/signup', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const params = req.body as IAuthSignupParams;
    await signup(params);
    res.status(200).json("Se ha enviado un correo para activar y verificar cuenta.");
}))

router.get('/verify', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {

    const params: IAuthVerifyParams = {
        hash: req.query.h.toString(),
        expiration: new Date(req.query.e.toString()),
        email: req.query.m.toString()
    };

    await verifyAccount(params);

    res.status(200).json("¡Cuenta verificada! :)");
}))
export default router
