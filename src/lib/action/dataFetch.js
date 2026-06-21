import { authHeader } from "./sessionTeken";

const serverURL = process.env.SERVER_URL;
export const getData = async (path) => {
    const res = await fetch(`${serverURL}${path}`);
    const data = await res.json();
    return data;
}

export const protectedFetch = async (path) => {
    const res = await fetch(`${serverURL}${path}`, {
        headers: await authHeader(),
    });
    return res.json();
}