// const path = require("path");
// const fs = require("fs");
// const puppeteer = require("puppeteer");
// const ejs = require("ejs");
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Supplier } from "../models/Supplier";
import { InspectionReport } from "../models/InspectionReport";
const BACKEND_URL = process.env.BACKEND_URL;

export const createReport = async (req: Request, res: Response) => {
  try {
    const { createdByEmail, title, supplierId, status } = req.body;
    const description = req.body.description || "";

    if (!createdByEmail || !title || !supplierId || !status) {
      return res.status(400).json({
        error: "createdByEmail, title, supplierId and status are required",
      });
    }

    if (status !== "OK" && status !== "DEFECT") {
      return res.status(400).json({ error: "status must be OK or DEFECT" });
    }

    if (!mongoose.isValidObjectId(supplierId)) {
      return res.status(400).json({ error: "supplierId is invalid" });
    }

    const supplierExists = await Supplier.exists({ _id: supplierId });
    if (!supplierExists) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    const report = await InspectionReport.create({
      createdBy: String(createdByEmail).trim().toLowerCase(),
      title: String(title).trim(),
      description: String(description),
      supplierId,
      status,
    });

    return res.status(201).json(report);
  } catch (err) {
    console.error("Error creating report:", err);
    return res.status(500).json({ error: "Report could not be created" });
  }
};

export const listAllReports = async (_req: Request, res: Response) => {
  try {
    const reports = await InspectionReport.find().populate("supplierId").sort({ createdAt: -1 });

    return res.json(reports);
  } catch (err) {
    console.error("Error listing reports:", err);
    return res.status(500).json({ error: "Reports could not be loaded" });
  }
};

export const getReportBySupplierId = async (req: Request, res: Response) => {
  try {
    const { supplierId } = req.params;
    if (!mongoose.isValidObjectId(supplierId)) {
      return res.status(400).json({ error: "Invalid supplier ID" });
    }

    const reports = await InspectionReport.find({ supplierId }).sort({ createdAt: -1 });
    return res.json(reports);
  } catch (err) {
    return res.status(500).json({ error: "Reports could not be loaded" });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  console.log("[GET /by-id] Params:", req.params);

  try {
    const report = await InspectionReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report nicht gefunden" });
    }
    res.json(report);
  } catch (err) {
    console.error("[GET /by-id] Error:", err);
    res.status(500).json({ error: "Report kann nicht geladen werden" });
  }
};

export const deleteReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid report ID" });
    }

    const deletedReport = await InspectionReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    return res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("Error deleting report:", err);
    return res.status(500).json({ error: "Report could not be deleted" });
  }
};

// exports.editReportById = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { title, description } = req.body;
// 		const updated = await Report.findByIdAndUpdate(id, { title, description }, { new: true });
// 		if (!updated) return res.status(404).json({ error: "Report nicht gefunden" });
// 		res.json(updated);
// 	} catch (err) {
// 		console.error("Fehler beim Aktualisieren des Reports:", err);
// 		res.status(500).json({ error: "Update fehlgeschlagen" });
// 	}
// };

// exports.getReportsByUserEmail = async (req, res) => {
// 	try {
// 		const userEmail = req.params.userEmail?.trim().toLowerCase();
// 		if (!userEmail) return res.status(400).json({ error: "userEmail erforderlich" });
// 		const reports = await Report.find({ userEmail }).sort({ date: -1 });
// 		res.json(reports);
// 	} catch (err) {
// 		console.error("Fehler beim Abrufen der Reports:", err);
// 		res.status(500).json({ error: "Reports konnten nicht geladen werden" });
// 	}
// };

// exports.updateReporttById = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { title, description } = req.body;
// 		const updated = await Report.findByIdAndUpdate(id, { title, description }, { new: true });
// 		if (!updated) return res.status(404).json({ error: "Report not found" });
// 		res.json(updated);
// 	} catch (err) {
// 		console.error("Error updating report:", err);
// 		res.status(500).json({ error: "Failed to update report" });
// 	}
// };

// exports.generatePdf = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const report = await Report.findById(id);
// 		if (!report) return res.status(404).json({ error: "Report not found" });

// 		const templatePath = path.join(__dirname, "../templates/reportPDF.ejs");

// 		const html = await ejs.renderFile(templatePath, {
// 			report,
// 			baseUrl: BACKEND_URL, // <— important
// 		});

// 		const pdfDir = path.join(__dirname, "../uploads/pdfs/reports");
// 		if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

// 		const pdfPath = path.join(pdfDir, `report_${report._id}.pdf`);

// 		const browser = await puppeteer.launch({
// 			args: ["--no-sandbox", "--disable-setuid-sandbox"],
// 			headless: true,
// 		});
// 		const page = await browser.newPage();
// 		await page.setContent(html, { waitUntil: "networkidle0" });
// 		await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
// 		await browser.close();

// 		res.download(pdfPath);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: "could not create PDF" });
// 	}
// };
