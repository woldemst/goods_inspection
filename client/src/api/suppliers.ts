import { API_BASE_URL } from "../config/api";

export type Supplier = {
    _id: string;
    name: string;
    contactEmail: string;
    notes?: string;
};

export async function fetchSuppliers(): Promise<Supplier[]> {
    const res = await fetch(`${API_BASE_URL}/suppliers`);
    if (!res.ok) throw new Error(`Failed to fetch suppliers: ${res.status}`);
    return res.json();
}

export async function fetchSupplierById(id: string): Promise<Supplier> {
    const res = await fetch(`${API_BASE_URL}/suppliers/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch supplier: ${res.status}`);
    return res.json();
}

export async function updateSupplier(
    id: string,
    input: { name: string; contactEmail?: string; notes?: string },
): Promise<Supplier> {
    const res = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    if (!res.ok) throw new Error(`Failed to update supplier: ${res.status}`);
    return res.json();
}

export async function createSupplier(input: {
    name: string;
    contactEmail?: string;
    notes?: string;
}): Promise<Supplier> {
    const res = await fetch(`${API_BASE_URL}/suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create supplier: ${res.status}`);
    return res.json();
}
