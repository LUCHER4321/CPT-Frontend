interface PlanFeaturesProps {
    children?: string[] | string
}

export const PlanFeatures = ({
    children
}: PlanFeaturesProps) => {
    const features = typeof children === 'string' 
        ? children.split('\n').filter(line => line.trim() !== '')
        : children || [];
    return (
        <div className="mb-6">
            <ul>
                {features?.map((c, index) => <li key={index}>
                    <i className="fas fa-check text-[#1B5E20] dark:text-[#D8EDD9]"/>{(c.startsWith(" ") ? "" : " ") + c}
                </li>)}
            </ul>
        </div>
    )
}