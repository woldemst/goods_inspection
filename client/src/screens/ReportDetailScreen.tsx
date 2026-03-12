import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Pressable, Platform } from "react-native";
import { fetchReportById, Report, deleteReport } from "../api/reports";

export function ReportDetailScreen({ route, navigation }: any) {
  const { reportId } = route.params;

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      setLoading(true);
      setReport(await fetchReportById(reportId));
    } catch (err: any) {
      setError(err.message ?? "Failed to load report");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete() {
    try {
      if (!report) return;

      setError(null);
      setLoading(true);

      await deleteReport(report._id);

      navigation.navigate("Reports");
    } catch (err: any) {
      setError(err.message ?? "Failed to delete report");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!report) return;

    if (Platform.OS === "web") {
      const confirmed = window.confirm(`Are you sure you want to delete "${report.title}"?`);
      if (confirmed) {
        onDelete();
      }
      return;
    }
    Alert.alert("Delete Report", `Are you sure you want to delete "${report.title}"?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  }
  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Button title="Back" onPress={() => navigation.goBack()} />

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Report Detail</Text>

      {loading ? <Text>Loading...</Text> : null}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      {report ? (
        <View style={{ gap: 6 }}>
          <Text style={{ fontWeight: "600" }}>Title:</Text>
          <Text>{report.title}</Text>

          <Text style={{ fontWeight: "600" }}>Status:</Text>
          <Text>{report.status}</Text>

          <Text style={{ fontWeight: "600" }}>Created by:</Text>
          <Text>{report.createdByEmail}</Text>

          <Text style={{ fontWeight: "600" }}>Description:</Text>
          <Text>{report.description || "-"}</Text>

          <Text style={{ fontWeight: "600" }}>Supplier:</Text>
          <Text>
            {typeof report.supplierId === "object" && report.supplierId?.name
              ? report.supplierId.name
              : String(report.supplierId)}
          </Text>

          <Text style={{ fontWeight: "600" }}>Created at:</Text>
          <Text>{new Date(report.createdAt).toLocaleString()}</Text>

          <Pressable
            onPress={confirmDelete}
            disabled={loading || !report}
            style={{
              marginTop: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: loading || !report ? "#cccccc" : "#d9534f",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>{loading ? "Deleting..." : "Delete Report"}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
