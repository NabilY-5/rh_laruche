import { uploadFileToDrive } from "./src/services/googleDrive";

async function test() {
  try {
    const result = await uploadFileToDrive(
      "./test.pdf",
      "1oIsOWLEFYpCJRQCU3pOxs3E788cOqTNK",
    );

    console.log("Upload OK :", result);
  } catch (err) {
    console.error("Erreur upload :", err);
  }
}

test();
