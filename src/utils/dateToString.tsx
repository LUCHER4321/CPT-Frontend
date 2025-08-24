const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fixedNumber = (n: number, digits = 2) => n.toString().padStart(digits, "0")

const nthDay = (d: number) => {
    switch(d % 10) {
        case 1: return d.toString() + (d === 11 ? "th" : "st");
        case 2: return d.toString() + (d === 12 ? "th" : "nd");
        case 3: return d.toString() + (d === 13 ? "th" : "rd");
        default: return d.toString() + "th";
    }
}

export const dateToString = (format?: string, date?: Date) => {
    const newDate = new Date(date ?? new Date());
    return format
        ?.replace("YYYY", fixedNumber(newDate.getFullYear(), 4))
        .replace("YY", fixedNumber(newDate.getFullYear() % 100))
        .replace("MMn", months.at(newDate.getMonth()) ?? "")
        .replace("MM", fixedNumber(newDate.getMonth() + 1))
        .replace("DDth", nthDay(newDate.getDate()))
        .replace("DD", fixedNumber(newDate.getDate()))
        .replace("hh", fixedNumber(newDate.getHours()))
        .replace("mm", fixedNumber(newDate.getMinutes()))
        .replace("ss", fixedNumber(newDate.getSeconds()))
        .replace("ms", fixedNumber(newDate.getMilliseconds(), 3));
}