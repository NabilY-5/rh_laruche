import type { RequestHandler } from "express";
import fs from "node:fs";
import { uploadFileToDrive } from "../../services/googleDrive";
import pointageRepository from "./pointageRepository";

const FOLDER_ID = "1hEHt_J3jdrQRwsWJZk4HzJQ_nnIdU07Y";

const uploadPointageController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Aucun fichier reçu" });
      return;
    }

    const employee = req.body.employee;
    const filePath = req.file.path;

    // Upload vers Google Drive
    const driveFile = await uploadFileToDrive(filePath, FOLDER_ID);

    if (!driveFile.id) {
      throw new Error("Erreur lors de l’upload vers Google Drive");
    }

    // Construire l’URL
    const fileUrl = `https://drive.google.com/file/d/${driveFile.id}/view`;

    const insertId = await pointageRepository.create({
      employee,
      file_url: fileUrl,
    });

    // 4. Supprimer le fichier temporaire
    fs.unlinkSync(filePath);

    res.status(201).json({ insertId, file_url: fileUrl });
  } catch (error) {
    next(error);
  }
};

export default uploadPointageController;
