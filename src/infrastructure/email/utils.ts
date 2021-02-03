import mjml2html from "mjml";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

export const bindModelInFile = async (filePath: string, model: any) => {
    const mjmlTemplate = fs.readFileSync(`${__dirname}${filePath}`, 'utf8');
    const template = Handlebars.compile(mjmlTemplate);
    return template({fullName: model.fullName, verificationLink: model.verificationLink});
}
export const renderMjmlAsHtml = async (mjmlTemplate: string) => {
    const {html} = mjml2html(mjmlTemplate, {
        filePath: path.join(__dirname, 'mjml'),
    });
    return html.toString()
}
