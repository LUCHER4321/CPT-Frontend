import { borderButton, filledButton, title } from "../data/classNames";
import { LinkButton } from "./LinkButton";

interface HeroProps {
    hrefStart?: string;
    hrefInfo?: string;
}

export const Hero = ({
    hrefStart,
    hrefInfo
}: HeroProps) => {
    return (
        <section className="flex flex-col sm:flex-row justify-between px-[2rem] sm:px-[8rem] py-[4rem] bg-lime-100 dark:bg-green-700">
            <div className="sm:w-1/2 w-full">
                <h1 className={"mb-3 text-center sm:text-start " + title}>
                    Create and Explore Phylogenetic Trees
                </h1>
                <p className="text-center sm:text-start my-3">
                    Visualize different species' evolution or create your own speculative evolution projects
                </p>
                <div className="flex flex-row mt-3">
                    <LinkButton className={"mr-4 " + filledButton} href={hrefStart}>Start Now</LinkButton>
                    <LinkButton className={borderButton} href={hrefInfo}>More Info</LinkButton>
                </div>
            </div>
            <img alt="Logo" />
        </section>
    )
};