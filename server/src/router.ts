import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define Conges-related routes
import congesActions from "./modules/rh/congesActions";
import upload from "./middlewares/upload";
import uploadCongeController from "./modules/rh/uploadCongeController";

router.post("/api/conges", congesActions.add);
router.get("/api/conges", congesActions.browse);
router.get("/api/conges/:id", congesActions.read);
router.post("/conges/upload", upload.single("file"), uploadCongeController);

/* ************************************************************************* */

// Define Pointages-related routes
import pointageActions from "./modules/rh/pointageActions";
import uploadPointageController from "./modules/rh/uploadPointageController";

router.post("/api/pointages", pointageActions.add);
router.get("/api/pointages", pointageActions.browse);
router.get("/api/pointages/:id", pointageActions.read);
router.post(
  "/pointages/upload",
  upload.single("file"),
  uploadPointageController,
);

/* ************************************************************************* */

export default router;
