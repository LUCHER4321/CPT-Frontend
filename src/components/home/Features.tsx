import { title } from "../../data/classNames";
import { Card } from "./Card";

interface FeaturesProps {
    id?: string
}

export const Features = ({
    id
}: FeaturesProps) => {
    return (
        <section id={id} className="text-center p-16">
            <h2 className={"text-[2rem] mb-12 " + title}>
                Main Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <Card
                    fa="fa-project-diagram"
                    title="Visual Editor"
                    description="Create interctive trees"
                />
                <Card
                    fa="fa-users"
                    title="Colaboration"
                    description="Work as a team with other users"
                />
                <Card
                    fa="fa-globe"
                    title="Public Trees"
                    description="Explore and share your creations"
                />
            </div>
        </section>
    )
};