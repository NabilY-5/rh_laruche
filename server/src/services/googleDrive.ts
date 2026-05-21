import "dotenv/config";
import { google } from "googleapis";
import fs from "node:fs";
import path from "node:path";
import serviceAccount from "../../credentials.json";

const auth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/drive"],
  subject: process.env.GOOGLE_IMPERSONATE_EMAIL,
});

const drive = google.drive({ version: "v3", auth });

export async function uploadFileToDrive(filePath: string, folderId: string) {
  const fileName = path.basename(filePath);

  const response = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    },
  });

  return response.data;
}
