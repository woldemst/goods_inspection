import { Router } from "express";
import { createSupplier, getSupplierById, listAllSuppliers } from "../controllers/supplier-controller";

export const supplierRouter = Router();

supplierRouter.post("/", createSupplier);
supplierRouter.get("/", listAllSuppliers);
supplierRouter.get("/:id", getSupplierById);
