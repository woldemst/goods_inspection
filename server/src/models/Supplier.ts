import { Schema, Types, model } from "mongoose";

const supplierSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },

		contactEmail: { type: String, trim: true, lowercase: true, default: "" },
		notes: { type: String, default: "" },
	},
	{ timestamps: true },
);

export const Supplier = model("Supplier", supplierSchema);
