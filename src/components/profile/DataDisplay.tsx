import { title as titleClass } from "../../data/classNames"

interface DataDisplayProps {
    data?: number | string;
    title?: string;
}

export const DataDisplay = ({
    data,
    title
}: DataDisplayProps) => {
    return (
        <div className="flex flex-col text-center">
            <p className={"text-xl " + titleClass}>{data}</p>
            <p className="text-xs">{title}</p>
        </div>
    )
}