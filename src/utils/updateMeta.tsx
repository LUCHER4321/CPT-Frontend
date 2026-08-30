import { META_DESC } from "../config";

interface UpdateMetaProps {
    title?: string;
    description?: string;
    image?: string;
}

const updateOgMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
};

export const updateMeta = ({
    title = "Life Tree | Create Phylogenetic Trees",
    description = META_DESC,
    image = (document.querySelector('meta[property="og.url"]')?.getAttribute("content") ?? "") + "/logo.svg"
}: UpdateMetaProps) => {
    updateOgMetaTag("title", title);
    updateOgMetaTag("description", description);
    updateOgMetaTag("image", image);
};