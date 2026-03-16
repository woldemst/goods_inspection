import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { login, saveToken } from "../api/auth";

export function LoginScreen({ onLogin }: any) {
    const [email, setEmail] = useState("admin@test.de");
    const [password, setPassword] = useState("123456");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit() {
        try {
            setError(null);
            setLoading(true);

            const data = await login({ email, password });
            await saveToken(data.token);

            onLogin(data.user);
        } catch (err: any) {
            setError(err.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
            />

            <Text>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
            />

            <Button title={loading ? "Logging in..." : "Login"} onPress={onSubmit} disabled={loading} />
        </View>
    );
}
