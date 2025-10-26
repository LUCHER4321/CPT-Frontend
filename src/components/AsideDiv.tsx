export const AsideDiv = () => {
    const aside = document.querySelector("aside");
    const marginTop = aside?.clientHeight;
    return (
        <div style={{ marginTop }} className="block sm:hidden"/>
    )
}