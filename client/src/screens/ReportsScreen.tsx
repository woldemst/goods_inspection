import React, { useEffect, useState } from "react";
import { fetchReports, Report } from "../api/reports";
import { View, Text, Button, FlatList } from "react-native";

export function ReportsScreen() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        try {
            setError(null);
            setLoading(true);
            setReports(await fetchReports());
        } catch (e: any) {
            setError(e.message ?? "Failed to load reports");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Reports</Text>
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Button title={loading ? "Loading..." : "Reload"} onPress={load} disabled={loading} />

            <FlatList
                data={reports}
                keyExtractor={(r) => r._id}
                renderItem={({ item }) => (
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontWeight: "600" }}>{item.title}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>By: {item.createdByEmail}</Text>
                        <Text>Supplier: {typeof item.supplierId === "object" && item.supplierId?.name ? item.supplierId.name : String(item.supplierId)}</Text>
                    </View>
                )}
            />
        </View>
    );
}
