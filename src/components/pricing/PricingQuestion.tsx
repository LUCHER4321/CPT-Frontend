interface PricingQuestionProps {
    active?: boolean;
    onClick?: () => void;
    question?: string;
    children?: any;
}

export const PricingQuestion = ({
    active,
    onClick,
    question,
    children
}: PricingQuestionProps) => {
    return (
        <div className="mb-3 rounded overflow-hidden border w-full">
            <button className="p-4! flex flex-row justify-between w-full items-center rounded! focus:outline-0! hover:border-0! border-0! bg-neutral-100! dark:bg-neutral-900! hover:bg-neutral-200! dark:hover:bg-neutral-700!" onClick={onClick}>
                <span>{question}</span>
                <i className={`fas fa-chevron-down ${active ? "rotate-180" : "rotate-none"} transition-all duration-300`}/>
            </button>
            <div className={`px-4 ${active ? "max-h-125" : "max-h-0"} transition-[max-height]! duration-300`}>
                {children}
            </div>
        </div>
    )
}