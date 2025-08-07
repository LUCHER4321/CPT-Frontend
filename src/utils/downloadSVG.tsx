export const downloadSVG = async (svgId = "", name = "tree") => {
    const filename = name + ".svg";
    const container = document.getElementById(svgId);
    if(!container) return;
    const svgElement = container.querySelector("svg") as SVGSVGElement | null;
    if (!svgElement) return;
    const clonedContainer = container.cloneNode(true) as HTMLElement;
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
    const images = clonedSvg.querySelectorAll("img");
    await Promise.all(Array.from(images).map(processImageElement));
    convertNamesToSvgText(clonedContainer, clonedSvg);
    clonedSvg.setAttribute("width", svgElement.width.baseVal.value.toString());
    clonedSvg.setAttribute("height", svgElement.height.baseVal.value.toString());
    clonedSvg.setAttribute("viewBox", `0 0 ${svgElement.width.baseVal.value} ${svgElement.height.baseVal.value}`);
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(clonedSvg);
    if (!svgString.includes("<?xml")) svgString = '<?xml version="1.0" standalone="no"?>\n' + svgString;
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
};

const processImageElement = async (imgElement: HTMLImageElement) => {
    const src = imgElement.getAttribute("src") || imgElement.getAttribute("xlink:src");
    if(!src) return;
    try {
        const response = await fetch(src);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
        imgElement.setAttribute("src", base64);
        if (imgElement.hasAttribute("xlink:src")) imgElement.setAttribute("xlink:src", base64);
    } catch {
        return undefined;
    }
};

const convertNamesToSvgText = (container: HTMLElement, svg: SVGSVGElement) => {
    const nameContainers = container.querySelectorAll('[class*="absolute"][class*="top-0"][class*="left-full"]');
    nameContainers.forEach(c => {
        const textElement = c.querySelector("p");
        if(!textElement) return;
        const parentNode = c.closest("foreignObject");
        if(!parentNode) return;
        const [x, y, width, height] = "x,y,width,height".split(",").map(a => parseFloat(parentNode.getAttribute(a) ?? "0"));
        const svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        svgText.setAttribute("x", (x + width + 10).toString());
        svgText.setAttribute("y", (y + height / 2).toString());
        svgText.setAttribute("fill", "currentColor");
        svgText.setAttribute("font-size", "14px");
        svgText.setAttribute("dominant-baseline", "middle");
        svgText.textContent = textElement.textContent;
        svg.appendChild(svgText);
    });
};