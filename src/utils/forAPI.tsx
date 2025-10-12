import { API_KEY, API_URL, DESIGN_MODE } from "../config";

type Method = "GET" | "POST" | "PATCH" | "DELETE"

const url = (...route: string[]) => `${API_URL}/${route.join("/")}?apiKey=${API_KEY}`;

const initialConfig = <T,>(method: Method, body: T) => ({
    method,
    headers: body ? new Headers({
        "Content-Type": "application/json"
    }) : undefined,
    body: body ? JSON.stringify(body) : undefined
});

interface FetchConfigProps<T> {
    method?: Method;
    body?: T;
    route?: string[];
    queries?: any;
}

export const fetchConfig = async <T,>({
    method = "GET",
    body,
    route = [],
    queries = {}
}: FetchConfigProps<T>) => {
    try {
        if(DESIGN_MODE) throw new Error("Design Mode");
        const result = await fetch(
            `${url(...route)}${Object.keys(queries).map(k => `&${k}=${queries[k]}`).join("")}`,
            {
                ...initialConfig(method, body),
                credentials: "include"
            }
        );
        if(!result.ok) {
            const errorData = await result.json();
            throw new Error(errorData.error || "Connection Failed");
        }
        return await result.json();
    } catch (error) {
        return { error: (error as Error).message };
    }
};

interface FetchImageProps {
    route?: string[];
    image: File;
}

export const fetchImage = async ({
    route = [],
    image
}: FetchImageProps) => {
    try{
        if(DESIGN_MODE) throw new Error("Design Mode");
        const body = new FormData();
        body.append("image", image);
        const result = await fetch(url(...route), {
            method: "POST",
            body,
            credentials: "include"
        }).catch(() => {
            throw new Error("Upload Failed");
        });
        if(!result.ok) throw new Error("Connection Failed");
        return await result.json();
    } catch {
        return undefined;
    }
};