export interface IAuthLoginParams {
    email: string
    password: string
}

export interface IAuthSignupParams {
    email: string
    password: string
    firstName: string
    lastName: string
    gender: "Hombre" | "Mujer" | "Otro"
    birth: Date
}

export interface IAuthVerifyParams {
    email: string
    hash: string
    expiration: Date
}

