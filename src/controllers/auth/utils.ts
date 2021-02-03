import bcrypt from "bcrypt";
import moment from "moment";

export async function encrypt(value: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(value, salt);
    return hash;
}

export async function decrypt(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export function countDays(expiration: Date) {
    const start = moment(expiration);
    const end = moment(Date.now());

    //Difference in number of days
    const totalDays = moment.duration(start.diff(end)).asDays();
    return totalDays;
}
