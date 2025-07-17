import { title } from "../../data/classNames"

export const AuthBanner = () => {
    return (
        <div className="bg-[#D8EDD9] dark:bg-[#1B5E20] hidden sm:flex flex-col items-center justify-center text-center p-[3rem] w-full top-0 bottom-0">
            <div className="max-w-100">
                <h3 className={"text-[1.8rem] mb-[1rem] " + title}>Explore the tree of life</h3>
                <p className="mb-8">Create, share and collaborate in phylogenetic trees with the community</p>
            </div>
            <img src="/logo.svg" alt="Logo" className="max-h-70!"/>
        </div>
    )
}