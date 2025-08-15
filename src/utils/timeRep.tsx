import { TimeUnit } from "../enums";

export const timeRep = (time?: number) => {
    if(time === undefined) return "";
    if(time === 0) return "0Y";
    for(const [k, v] of Object.entries(TimeUnit).reverse()) if(Math.abs(time) >= +v) return (time / +v).toFixed(2) + k;
}