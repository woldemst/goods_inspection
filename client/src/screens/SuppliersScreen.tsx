import React, { useCallback, useState } from "react";
import { View, Text, Button, FlatList, TextInput, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { createSupplier, fetchSuppliers, Supplier } from "../api/suppliers";

export function SuppliersScreen({ navigation }: any) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [notes, setNotes] = useState("");

    async function load() {
        try {
            setError(null);
            setLoading(true);
            setSuppliers(await fetchSuppliers());
        } catch (err: any) {
            console.error("Failed to load suppliers:", err);
            setError(err.message || "Failed to load suppliers");
        } finally {
            setLoading(false);
        }
    }

    async function onCreate() {
        try {
            setError(null);
            if (!name.trim()) {
                setError("Name is required");
                return;
            }
            await createSupplier({ name, contactEmail, notes });
            setName("");
            setContactEmail("");
            setNotes("");
            await load();
        } catch (err: any) {
            setError(err.message || "Failed to create supplier");
        }
    }

    useFocusEffect(
        useCallback(() => {
            load();
        }, []),
    );

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Suppliers</Text>

            <View style={{ paddingVertical: 8, gap: 8 }}>
                <Text style={{ fontWeight: "600" }}>Create Supplier</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
                />
                <TextInput
                    placeholder="Contact Email"
                    value={contactEmail}
                    onChangeText={setContactEmail}
                    style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
                />
                <TextInput
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
                    multiline
                    numberOfLines={3}
                />
                <Button title="Create" onPress={onCreate} />
            </View>

            <FlatList
                data={suppliers}
                keyExtractor={(s) => s._id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate("SupplierDetail", { supplierId: item._id })}
                        style={{ paddingVertical: 8, borderBottomWidth: 1 }}
                    >
                        <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                        {item.contactEmail ? <Text>{item.contactEmail}</Text> : null}
                        {item.notes ? <Text>{item.notes}</Text> : null}
                    </Pressable>
                )}
            />
        </View>
    );
}
