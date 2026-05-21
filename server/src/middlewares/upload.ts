import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";

// Dossier temporaire pour stocker les fichiers avant upload Drive
const uploadFolder = path.join(__dirname, "../../tmp");

// Création du dossier si inexistant
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Stockage sur disque (doc officielle)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filtre pour n’accepter que les PDF
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Seuls les fichiers PDF sont autorisés"));
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
