export const AsideDiv = () => {
    const aside = document.querySelector("aside");
    const height = aside?.clientHeight;
    return (
        <div style={{ height }} className="block sm:hidden"/>
    )
}