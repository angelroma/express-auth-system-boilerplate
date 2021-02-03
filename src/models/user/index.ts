import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";
import {IAuthSignupParams} from "../../controllers/auth/interfaces";

export interface IUserDocument extends IAuthSignupParams, Document {
    active: boolean
    activatedAt?: Date
    createdAt: Date
}

const collection = "User"

const UserSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    activatedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const UserModel = mongoose.model<IUserDocument>(collection, UserSchema, collection);

