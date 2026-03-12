import { Router } from "express";
import { reportRouter } from "./report-routes";
import { supplierRouter } from "./supplier-routes";
import { authRouter } from "./auth-routes";

export const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

router.use("/auth", authRouter);
router.use("/reports", reportRouter);
router.use("/suppliers", supplierRouter);
