import type { RequestHandler } from "express";

// Import access to data
import congesRepository from "./congesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const conges = await congesRepository.readAll();

    res.json(conges);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const congeId = Number(req.params.id);
    const conge = await congesRepository.read(congeId);

    if (conge == null) {
      res.sendStatus(404);
    } else {
      res.json(conge);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newConge = {
      employee: req.body.employee,
      file_url: req.body.file_url,
    };

    const insertId = await congesRepository.create(newConge);

    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
