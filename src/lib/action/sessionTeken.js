import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUserToken = async () => {
    const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    );

    return session?.session?.token || null

};


export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        'Authorization': `Bearer ${token}`
    } : {};

    return header;
}