import { Request, Response } from "express";
import mongoose from "mongoose";
import { Supplier } from "../models/Supplier";

import path from "path";
import fs from "fs";
// import ejs from "ejs";
// const puppeteer = require("puppeteer");

export const createSupplier = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const contactEmail = req.body.contactEmail || "";
		const notes = req.body.notes || "";

		console.log(name, notes, contactEmail);

		if (!name) {
			return res.status(400).json({ error: "name is required" });
		}

		const supplier = await Supplier.create({
			name: String(name).trim(),
			contactEmail: String(contactEmail).trim().toLowerCase(),
			notes: String(notes).trim(),
		});

		return res.status(201).json(supplier);
	} catch (err) {
		console.error("Error if creating a supplier:", err);
		res.status(500).json({ error: "Supplier could not be created" });
	}
};

export const listAllSuppliers = async (_req: Request, res: Response) => {
	try {
		const suppliers = await Supplier.find().sort({ createdAt: -1 });
		return res.json(suppliers);
	} catch (err) {
		console.error("Error listing suppliers:", err);
		return res.status(500).json({ error: "Suppliers could not be loaded" });
	}
};

export const getSupplierById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ error: "Invalid supplier ID" });
		}

		const supplier = await Supplier.findById(id);

		if (!supplier) return res.status(404).json({ error: "Supplier not found" });

		return res.json(supplier);
	} catch (err) {
		console.error("Error fetching supplier by ID:", err);
		res.status(500).json({ error: "Failed to fetch supplier" });
	}
};

// exports.getAllProjectsByUserId = async (req, res) => {
// 	try {
// 		const userId = req.params.userEmail?.trim().toLowerCase();
// 		if (!userId) return res.status(400).json({ error: "need userId" });
// 		const projects = await Project.find({ userId }).sort({ date: -1 });
// 		res.json(projects);
// 	} catch (err) {
// 		console.error("Error if fetching projects by userId:", err);
// 		res.status(500).json({ error: "Projects could not be fetched" });
// 	}
// };

// 	exports.updateProjectById = async (req, res) => {
// 		try {
// 			const { id } = req.params;
// 			const { title, description, imageUri } = req.body;
// 			const updated = await Project.findByIdAndUpdate(id, { title, description, imageUri }, { new: true });
// 			if (!updated) return res.status(404).json({ error: "Project not found" });
// 			res.json(updated);
// 		} catch (err) {
// 		console.error("Error updating project:", err);
// 		res.status(500).json({ error: "Failed to update project" });
// 	}
// };

// exports.deleteProjectById = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const deleted = await Project.findByIdAndDelete(id);
// 		if (!deleted) return res.status(404).json({ error: "Project not found" });
// 		res.json({ success: true });
// 	} catch (err) {
// 		console.error("Error deleting project:", err);
// 		res.status(500).json({ error: "Failed to delete project" });
// 	}
// };

// exports.generatePdf = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const project = await Project.findById(id).populate("reports");
// 		if (!project) return res.status(404).json({ error: "Project not found" });

// 		const templatePath = path.join(__dirname, "../templates/projectPDF.ejs");

// 		// Render the EJS template with project data
// 		const html = await ejs.renderFile(templatePath, { project });

// 		const pdfDir = path.join(__dirname, "../uploads/pdfs/projects");
// 		if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

// 		const pdfPath = path.join(pdfDir, `project_${project._id}.pdf`);

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

// PDF herunterladen (liefert gespeichertes PDF aus Upload-Verzeichnis)
// exports.downloadPdf = async (req, res) => {
// 	const id = req.params.id;

// 	if (!id) return res.status(400).send("Keine Datei angegeben");

// 	const file = `project_${id}.pdf`;

// 	// const pdfPath = path.join("/uploads/pdfs/projects", file);
// 	const pdfPath = path.join(__dirname, "../uploads/pdfs/projects", file); // just relative path

// 	console.log("pdfPath", pdfPath);
// 	// console.log(pdfPath);

// 	if (!fs.existsSync(pdfPath)) {
// 		return res.status(404).send("PDF nicht gefunden");
// 	}
// 	res.download(pdfPath, file);
// };
