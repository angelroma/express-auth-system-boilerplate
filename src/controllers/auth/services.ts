import {UserModel} from "../../models/user";
import {IAuthLoginParams, IAuthSignupParams, IAuthVerifyParams} from "./interfaces";
import ErrorResponse from "../../utils/extenders/errorResponse";
import {countDays, decrypt, encrypt} from "./utils";
import {sendVerificationMail} from '../../infrastructure/email'
import {host} from '../../dotenv/config'
import moment from "moment";
import {IReceipt} from "../../interfaces/email";
import {IVerificationTemplate} from "../../infrastructure/email/interfaces";

export const login = async (params: IAuthLoginParams) => {
    const user = await UserModel.findOne({email: params.email});

    if (!user)
        throw new ErrorResponse("Correo no existente", 404);

    if (!await decrypt(params.password, user.password))
        throw new ErrorResponse("Las credenciales no son validas", 401)

    return user;
}

export const signup = async (params: IAuthSignupParams) => {
    params.email = params.email.trim();
    params.password = await encrypt(params.password.trim())
    const newUser = new UserModel(params);
    const user = await newUser.save()

    //To verify account, email+createdAt hash should be unencrypted
    const hash = await encrypt(`${params.email}${user.createdAt}`)

    //https:host/auth/verify?h=hash
    const verificationLink = `${host}/auth/verify?m=${params.email}&h=${hash}&e=${Date.now()}`;

    const templateModel: IVerificationTemplate = {
        fullName: `${params.firstName} ${params.lastName}`,
        verificationLink: verificationLink
    }

    const receipt: IReceipt = {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName
    }

    await sendVerificationMail(receipt,
        templateModel)
}

export const verifyAccount = async ({email, expiration, hash}: IAuthVerifyParams) => {
    const totalDays = countDays(expiration);

    console.log("totalDays", totalDays)
    if (totalDays > 6)
        throw new ErrorResponse("El link ha expirado", 401);

    const user = await UserModel.findOne({email: email});

    if (!user)
        throw new ErrorResponse("No se puede verificar la cuenta, el correo no existe", 404);

    if (user.active)
        throw new ErrorResponse(`El usuario ya se encuentra activo desde el ${user.activatedAt}`, 401);

    const key = `${email}${user.createdAt}`

    if (!await decrypt(key, hash))
        throw new ErrorResponse("No se puede verificar", 401)

    user.active = true;
    user.activatedAt = moment().toDate();
    user.isNew = false;

    await user.save()

    return true;
}

