import { Router } from "express";
import { createReport, listAllReports, getReportBySupplierId } from "../controllers/report-controller";
// import { upload } from "../middlewares/upload"; // wenn du upload als default export hast: import upload from ...

export const reportRouter = Router();

// Wichtig: spezifische Routen VOR den dynamischen Parametern!
// reportRouter.get("/id/:id", reportController.getReportById);
// reportRouter.get("/pdf/:id", reportController.generatePdf);

// Upload route
reportRouter.post("/", createReport);
reportRouter.get("/", listAllReports);
reportRouter.get("/supplier/:supplierId", getReportBySupplierId);
// Update/Delete
// reportRouter.put("/:id", reportController.editReportById);
// reportRouter.put("/update/:id", reportController.updateReporttById);
// reportRouter.delete("/delete/:id", reportController.deleteReportById);
