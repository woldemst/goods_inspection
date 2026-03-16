import { getToken } from "./auth";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = await getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(url, {
        ...options,
        headers,
    });
}
