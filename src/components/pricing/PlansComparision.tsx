import { title } from "../../data/classNames";
import type { PlanPrice } from "../../types"

interface PlansComparisionProps {
    id?: string;
    prices?: PlanPrice[];
    features?: ({
        name: string;
        fun: (p: PlanPrice) => any
    })[];
    className?: string;
}

const row = "even:bg-neutral-100 dark:even:bg-neutral-900";
const cell = "border p-[1rem]";

export const PlansComparision = ({
    id,
    prices,
    features,
    className
}: PlansComparisionProps) => {
    return (
        <section id={id} className={"mb-12 w-full " + className}>
            <h2 className={"mb-6 text-2xl text-center " + title}>Detailed Plans Comparision</h2>
            <div className="overflow-x-scroll sm:overflow-x-auto">
                <table className="w-full text-center border-collapse mb-[1rem]">
                    <tr className={row}>
                        <th className={cell}>Feature</th>
                        {prices?.map((p, index) => <th key={index} className={cell}>{p.name}</th>)}
                    </tr>
                    {features?.map((f, index) =>
                    <tr key={index} className={row}>
                        <td className={cell}>{f.name}</td>
                        {prices?.map((p, i) => <td key={i} className={cell}>{f.fun(p)}</td>)}
                    </tr>
                    )}
                </table>
            </div>
        </section>
    )
}