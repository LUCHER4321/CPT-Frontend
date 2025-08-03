import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { circleImage } from "../../../data/classNames";

interface ImagePropProps {
    title?: string;
    image?: string;
    getRootProps?: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps?: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActive?: boolean;
    text?: string
}

export const ImageProp = ({
    title,
    image,
    text,
    getRootProps,
    getInputProps,
    isDragActive
}: ImagePropProps) => {
    return (
        <div className="mb-5 flex flex-col">
            <p className="font-bold mb-2">{title}</p>
            {image && <img src={image} className={"h-70! w-70! self-center my-5 " + circleImage} />}
            <div { ...getRootProps?.({ className: `border border-dashed rounded transition-all duration-300 ${isDragActive ? "text-[#D8EDD9] dark:text-[#1B5E20] bg-[#1B5E20] dark:bg-[#D8EDD9]" : ""} hover:text-[#D8EDD9] dark:hover:text-[#1B5E20] hover:bg-[#1B5E20] dark:hover:bg-[#D8EDD9] text-xl justify-center p-10 cursor-pointer flex flex-row space-x-2 items-center` }) }>
                <input { ...getInputProps?.() }/>
                <i className="fas fa-upload"/>
                <p>{text}</p>
            </div>
        </div>
    )
};