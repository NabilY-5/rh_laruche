import type { RequestHandler } from "express";

// Import access to data
import pointageRepository from "./pointageRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const pointages = await pointageRepository.readAll();

    res.json(pointages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const pointageId = Number(req.params.id);
    const pointage = await pointageRepository.read(pointageId);

    if (pointage == null) {
      res.sendStatus(404);
    } else {
      res.json(pointage);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newPointage = {
      employee: req.body.employee,
      file_url: req.body.file_url,
    };

    const insertId = await pointageRepository.create(newPointage);

    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
