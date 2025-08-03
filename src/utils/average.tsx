export const sum = (...numbers: (number | undefined)[]) => numbers.filter(n => n !== undefined).reduce((total, aNumber) => total + aNumber, 0);

export const average = (...numbers: (number | undefined)[]) => sum(...numbers) / numbers.length;

export const percentile = (per: number, ...numbers: (number | undefined)[]) => {
    const filterNumbers = numbers.filter(n => n !== undefined);
    if(filterNumbers.length === 0) return 0;
    if(per <= 0) return Math.min(...filterNumbers);
    if(per >= 1) return Math.max(...filterNumbers);
    const finalNumbers = filterNumbers.sort((a, b) => a - b);
    const pos = (finalNumbers.length - 1) * per;
    const [pos0, pos1, x] = [Math.floor, Math.ceil, (p: number) => p % 1].map(f => f(pos));
    return finalNumbers[pos0] * x + finalNumbers[pos1] * (1 - x);
};

export const median = (...numbers: (number | undefined)[]) => percentile(1 / 2, ...numbers);