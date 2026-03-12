import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], default: "employee", required: true },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
