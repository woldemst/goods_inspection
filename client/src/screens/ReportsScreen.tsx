import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, FlatList, Pressable, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { fetchReports, Report, fetchReportBySupplier } from "../api/reports";
import { Supplier, fetchSuppliers } from "../api/suppliers";

export function ReportsScreen({ navigation }: any) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  async function loadSupplier() {
    try {
      setError(null);
      setSuppliers(await fetchSuppliers());
    } catch (err: any) {
      setError(err.message ?? "Failed to load suppliers");
    }
  }

  async function load() {
    try {
      setError(null);
      setLoading(true);

      if (selectedSupplier) {
        setReports(await fetchReportBySupplier(selectedSupplier._id));
      } else {
        setReports(await fetchReports());
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSupplier();
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [selectedSupplier]),
  );

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Reports</Text>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Filter by Supplier:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 50 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => setSelectedSupplier(null)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: selectedSupplier === null ? "#dcdcdc" : "transparent",
            }}
          >
            <Text>All</Text>
          </Pressable>

          {suppliers.map((supplier) => {
            const selected = selectedSupplier?._id === supplier._id;
            return (
              <Pressable
                key={supplier._id}
                onPress={() => setSelectedSupplier(supplier)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 20,
                  backgroundColor: selected ? "#dcdcdc" : "transparent",
                }}
              >
                <Text>{supplier.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title={loading ? "Loading..." : "Reload"} onPress={load} disabled={loading} />

      <FlatList
        data={reports}
        keyExtractor={(r) => r._id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("ReportDetail", { reportId: item._id })}
            style={{ paddingVertical: 10, borderBottomWidth: 1 }}
          >
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Text>By: {item.createdByEmail}</Text>
            <Text>
              Supplier:{" "}
              {typeof item.supplierId === "object" && item.supplierId?.name
                ? item.supplierId.name
                : String(item.supplierId)}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
