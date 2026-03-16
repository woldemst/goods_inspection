import { Router } from "express";

import { createSupplier, getSupplierById, listAllSuppliers, updateSupplierById } from "../controllers/supplier-controller";

import { authRequired } from "../middlewares/auth-middleware";
import { requireRole } from "../middlewares/role-middleware";

export const supplierRouter = Router();

supplierRouter.get("/", authRequired, listAllSuppliers);
supplierRouter.get("/:id", authRequired, getSupplierById);

supplierRouter.post("/", authRequired, requireRole("admin"), createSupplier);
supplierRouter.put("/:id", authRequired, requireRole("admin"), updateSupplierById);
