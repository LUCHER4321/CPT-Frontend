import { API_KEY, API_URL } from "../config";

const url = (...route: string[]) => `${API_URL}/${route.join("/")}?apiKey=${API_KEY}`;

const initialConfig = <T,>(method: string, body: T) => ({
    method,
    headers: new Headers({
        "Content-Type": "application/json"
    }),
    body: JSON.stringify(body)
});

interface FetchConfigProps<T> {
    method?: string;
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
    const result = await fetch(`${url(...route)}${Object.entries(queries).map((k, v) => `&${k}=${v}`)}`, initialConfig(method, body));
    const {
        json,
    } = result;
    return await json();
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
    const result = await fetch(url(...route), {
        method: "POST",
        body
    });
    const {
        json,
    } = result;
    return await json();
};