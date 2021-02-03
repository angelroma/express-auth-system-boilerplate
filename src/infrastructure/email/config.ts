import nodemailer from "nodemailer";
import {smtp} from '../../dotenv/config'

export const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: 465,
    secure: true,
    auth: {
        user: smtp.user,
        pass: smtp.password
    }
});
