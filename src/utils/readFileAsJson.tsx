interface ReadFileAsJson<T> {
    file?: File;
    setJSON?: (json: T) => void
}

export const readFileAsJson = <T,>({
    file,
    setJSON
}: ReadFileAsJson<T>) => {
    if(file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if(typeof event.target?.result === "string") {
                try {
                    const json = JSON.parse(event.target.result);
                    setJSON?.(json);
                } catch {
                    return;
                }
            }
        };
        reader.readAsText(file);
    }
};