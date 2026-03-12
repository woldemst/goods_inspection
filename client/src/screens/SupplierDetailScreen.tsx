import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { fetchSupplierById, Supplier, updateSupplier } from "../api/suppliers";

export function SupplierDetailScreen({ route, navigation }: any) {
    const { supplierId } = route.params;

    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [name, setName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        try {
            setError(null);
            setLoading(true);

            const data = await fetchSupplierById(supplierId);
            setSupplier(data);
            setName(data.name || "");
            setContactEmail(data.contactEmail || "");
            setNotes(data.notes || "");
        } catch (err: any) {
            setError(err.message ?? "Failed to load supplier");
        } finally {
            setLoading(false);
        }
    }

    async function onSave() {
        try {
            setError(null);

            if (!name.trim()) {
                setError("Name is required");
                return;
            }

            setSaving(true);

            await updateSupplier(supplierId, {
                name,
                contactEmail,
                notes,
            });

            navigation.goBack();
        } catch (err: any) {
            setError(err.message ?? "Failed to update supplier");
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Button title="Back" onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Supplier Detail</Text>

            {loading ? <Text>Loading...</Text> : null}
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            {!loading ? (
                <>
                    <Text style={{ fontWeight: "600" }}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Supplier name"
                        style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
                    />

                    <Text style={{ fontWeight: "600" }}>Contact Email</Text>
                    <TextInput
                        value={contactEmail}
                        onChangeText={setContactEmail}
                        placeholder="Contact email"
                        autoCapitalize="none"
                        style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
                    />

                    <Text style={{ fontWeight: "600" }}>Notes</Text>
                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Notes"
                        multiline
                        numberOfLines={4}
                        style={{ borderWidth: 1, padding: 8, borderRadius: 4, minHeight: 90 }}
                    />

                    <Button title={saving ? "Saving..." : "Save Supplier"} onPress={onSave} disabled={saving} />
                </>
            ) : null}
        </View>
    );
}
