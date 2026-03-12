import { API_BASE_URL } from "../config/api";
import { Supplier } from "./suppliers";

export type Report = {
    _id: string;
    title: string;
    description: string;
    supplierId: string | Supplier; // populated object
    createdByEmail: string;
    status: "OK" | "DEFECT";
    createdAt: string;
};

export async function fetchReports(): Promise<Report[]> {
    const res = await fetch(`${API_BASE_URL}/reports`);
    if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);
    return res.json();
}

export async function fetchReportById(id: string): Promise<Report> {
    const res = await fetch(`${API_BASE_URL}/reports/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch reports by id: ${res.status}`);
    return res.json();
}

export async function fetchReportBySupplier(supplierId: string): Promise<Report[]> {
    const res = await fetch(`${API_BASE_URL}/reports/supplier/${supplierId}`);
    if (!res.ok) throw new Error(`Failed to fetch reports by supplier id: ${res.status}`);
    return res.json();
}

export async function deleteReport(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error(`Failed to delete report: ${res.status}`);
}

export async function createReport(input: {
    title: string;
    description?: string;
    supplierId: string;
    createdByEmail: string;
    status: "OK" | "DEFECT";
}): Promise<Report> {
    const res = await fetch(`${API_BASE_URL}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create report: ${res.status}`);
    return res.json();
}
