import { Router } from "express";
import { createReport, listAllReports, getReportBySupplierId, getReportById } from "../controllers/report-controller";
// import { upload } from "../middlewares/upload"; // wenn du upload als default export hast: import upload from ...

export const reportRouter = Router();

// reportRouter.get("/pdf/:id", reportController.generatePdf);

// Create a new report
reportRouter.post("/", createReport);

// Get all reports
reportRouter.get("/", listAllReports);

// Get all reports or reports by supplier
reportRouter.get("/supplier/:supplierId", getReportBySupplierId);

// Get a report by ID
reportRouter.get("/:id", getReportById);


// Update/Delete
// reportRouter.put("/:id", reportController.editReportById);
// reportRouter.put("/update/:id", reportController.updateReporttById);
// reportRouter.delete("/delete/:id", reportController.deleteReportById);
