import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { fetchReportById, Report } from "../api/reports";

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
        </View>
      ) : null}
    </View>
  );
}
