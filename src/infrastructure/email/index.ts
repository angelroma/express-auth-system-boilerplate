import {bindModelInFile, renderMjmlAsHtml} from "./utils";
import {transporter} from "./config";
import {IReceipt} from "../../interfaces/email";
import {IVerificationTemplate} from "./interfaces";

export const sendVerificationMail = async (receipt: IReceipt, model: IVerificationTemplate) => {

    const boundFile = await bindModelInFile("/mjml/verification.mjml", model);

    const html = await renderMjmlAsHtml(boundFile);

    const info = await transporter.sendMail({
        from: '"Super Pueblito" <soporte@superpueblito.com>',
        to: receipt.email,
        subject: "Verifica tu cuenta ✔",
        text: `Si no tienes problemas con el link, copia y pega el siguiente texto para verificar tu cuenta: ${model.verificationLink}`,
        html: html,
    });

    console.log(`Verification mail sent to ${receipt.email} at ${Date.now()}, MessageId: ${info.messageId}`);
}


