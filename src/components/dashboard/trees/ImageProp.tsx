import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

interface ImagePropProps {
    title?: string;
    image?: string;
    getRootProps?: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps?: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActive?: boolean;
}

export const ImageProp = ({
    title,
    image,
    getRootProps,
    getInputProps,
    isDragActive
}: ImagePropProps) => {
    return (
        <div className="mb-5 flex flex-col">
            <p className="font-bold mb-2">{title}</p>
            {image && <img src={image} className="h-70! w-70! self-center object-cover rounded-full my-5" />}
            <div { ...getRootProps?.({ className: `border border-dashed rounded transition-all duration-300 ${isDragActive ? "text-[#D8EDD9] dark:text-[#1B5E20] bg-[#1B5E20] dark:bg-[#D8EDD9]" : ""} hover:text-[#D8EDD9] dark:hover:text-[#1B5E20] hover:bg-[#1B5E20] dark:hover:bg-[#D8EDD9] text-xl justify-center p-10 cursor-pointer flex flex-row space-x-2 items-center` }) }>
                <input { ...getInputProps?.() }/>
                <i className="fas fa-upload"/>
                <p>{image ? "Update Image" : "Upload Image"}</p>
            </div>
        </div>
    )
};