export const getData = async (path) => {
    const serverURL = process.env.SERVER_URL;
    const res = await fetch(`${serverURL}${path}`);
    const data = await res.json();
    return data;
}