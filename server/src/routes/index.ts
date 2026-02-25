import { Router } from "express";
import { reportRouter } from "./report-routes";
import { supplierRouter } from "./supplier-routes";

export const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));
router.use("/reports", reportRouter);
router.use("/suppliers", supplierRouter);
