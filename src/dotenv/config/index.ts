export const port = process.env.PORT || 5001
export const DB_URI = process.env.DB_URI
export const host = process.env.HOST
export const smtp = {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS
}

console.log(smtp)
