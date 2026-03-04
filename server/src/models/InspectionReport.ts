import { Schema, model, Types } from "mongoose";

const inspectionReportSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, default: "" },
		status: { type: String, enum: ["OK", "DEFECT"], required: true },
		supplierId: { type: Types.ObjectId, ref: "Supplier", required: true },
		createdByEmail: { type: String, required: true, lowercase: true, trim: true },
		images: { type: [String], default: [] },
	},
	{ timestamps: true },
);

export const InspectionReport = model("InspectionReport", inspectionReportSchema);
