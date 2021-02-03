import express, {NextFunction, Request, Response} from "express";
import {asyncHandler} from "../../middlewares";
import {sendVerificationMail} from "../../infrastructure/email"
import {IReceipt} from "../../interfaces/email";
import {IVerificationTemplate} from "../../infrastructure/email/interfaces";

const router = express.Router();

router.post('/verification', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {

    const receipt: IReceipt = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }

    const templateModel: IVerificationTemplate = {
        verificationLink: "Fake Link",
        fullName: `${receipt.firstName} ${receipt.lastName}`
    }

    await sendVerificationMail(receipt, templateModel);
    res.send('Email Sent :)')
}))

export default router
