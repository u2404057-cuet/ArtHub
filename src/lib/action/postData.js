export const postData = async (path, bodyData) => {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "http://localhost:8000";
    const res = await fetch(`${serverURL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
    });
    const data = await res.json();
    return data;
}
