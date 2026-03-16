import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

const TOKEN_KEY = "auth_token";

export type LoginResponse = {
    token: string;
    user: {
        _id: string;
        email: string;
        role: "admin" | "employee";
    };
};

export async function login(input: { email: string; password: string }): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    if (!res.ok) throw new Error(`Login failed: ${res.status}`);
    return res.json();
}

export async function saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}
