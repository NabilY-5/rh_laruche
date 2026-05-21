import type { RequestHandler } from "express";
import fs from "node:fs";
import { uploadFileToDrive } from "../../services/googleDrive";
import congesRepository from "./congesRepository";

const FOLDER_ID = "1wwbifxV2o5m-zdQIWmfTT-jRqw4f-Mi8";

const uploadCongeController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Aucun fichier reçu" });
      return;
    }

    const employee = req.body.employee;
    const filePath = req.file.path;

    const driveFile = await uploadFileToDrive(filePath, FOLDER_ID);

    if (!driveFile.id) {
      throw new Error("Erreur lors de l'upload vers Google Drive");
    }

    const fileUrl = `https://drive.google.com/file/d/${driveFile.id}/view`;

    const insertId = await congesRepository.create({
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

export default uploadCongeController;
