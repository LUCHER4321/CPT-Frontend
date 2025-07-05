import { API_KEY, API_URL } from "../config";

type Method = "GET" | "POST" | "PATCH" | "DELETE"

const url = (...route: string[]) => `${API_URL}/${route.join("/")}?apiKey=${API_KEY}`;

const initialConfig = <T,>(method: Method, body: T) => ({
    method,
    headers: body ? new Headers({
        "Content-Type": "application/json"
    }) : undefined,
    body: JSON.stringify(body)
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
        const result = await fetch(`${url(...route)}${Object.entries(queries).map((k, v) => `&${k}=${v}`)}`, initialConfig(method, body));
        const {
            json,
        } = result;
        return await json();
    } catch {
        return undefined;
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
    const body = new FormData();
    body.append("image", image);
    try{
        const result = await fetch(url(...route), {
            method: "POST",
            body
        });
        const {
            json,
        } = result;
        return await json();
    } catch {
        return undefined;
    }
};