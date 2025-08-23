const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fixedNumber = (n: number, digits = 2) => n.toString().padStart(digits, "0")

export const dateToString = (format?: string, date?: Date) => {
    const newDate = new Date(date ?? new Date());
    return format
        ?.replace("YYYY", fixedNumber(newDate.getFullYear(), 4))
        .replace("YY", fixedNumber(newDate.getFullYear() % 100))
        .replace("MMn", months.at(newDate.getMonth()) ?? "")
        .replace("MM", fixedNumber(newDate.getMonth() + 1))
        .replace("DD", fixedNumber(newDate.getDate()))
        .replace("hh", fixedNumber(newDate.getHours()))
        .replace("mm", fixedNumber(newDate.getMinutes()))
        .replace("ss", fixedNumber(newDate.getSeconds()))
        .replace("ms", fixedNumber(newDate.getMilliseconds(), 3));
}