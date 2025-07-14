import { title } from "../data/classNames";
import { PricingQuestion } from "./PricingQuestion";

interface PricingFAQsProps {
    id?: string;
    active?: number;
    onClick?: (n: number) => void;
    faqs?: {
        question: string;
        answer: string;
    }[]
}

export const PricingFAQs = ({
    id,
    active,
    onClick,
    faqs
}: PricingFAQsProps) => {
    return (
        <section className="mb-8" id={id}>
            <h2 className={"mb-6 text-2xl text-center " + title}>FAQs</h2>
            <div className="mx-auto max-w-200">
                {faqs?.map((faq, index) =>
                    <PricingQuestion
                        active={active === index}
                        onClick={() => onClick?.(index)}
                        question={faq.question}
                    >
                        <p className="p-4">
                            {faq.answer}
                        </p>
                    </PricingQuestion>
                )}
            </div>
        </section>
    )
}