import { Schema, Types, model } from "mongoose";

const supplierSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		phone: { type: String, trim: true, default: "" },
		contactEmail: { type: String, trim: true, lowercase: true, default: "" },
		notes: { type: String, default: "" },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

export const Supplier = model("Supplier", supplierSchema);
