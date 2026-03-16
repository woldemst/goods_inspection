import { Router } from "express";

import { createReport, listAllReports, getReportBySupplierId, getReportById, deleteReportById } from "../controllers/report-controller";

import { authRequired } from "../middlewares/auth-middleware";
import { requireRole } from "../middlewares/role-middleware";

export const reportRouter = Router();

// reportRouter.get("/pdf/:id", reportController.generatePdf);

reportRouter.get("/", authRequired, listAllReports);
reportRouter.get("/supplier/:supplierId", authRequired, getReportBySupplierId);
reportRouter.get("/:id", authRequired, getReportById);

reportRouter.post("/", authRequired, requireRole("admin", "employee"), createReport);
reportRouter.delete("/:id", authRequired, requireRole("admin"), deleteReportById);

// Update/Delete
// reportRouter.put("/:id", reportController.editReportById);
// reportRouter.put("/update/:id", reportController.updateReporttById);
