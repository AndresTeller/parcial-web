import { Router } from "express";
import {
  createProfesor,
  deleteProfesor,
  getProfesor,
  getProfesores,
  updateProfesor,
} from "../controllers/profesor.controller.js";

const router = Router();

router.get("/api/v1/profesores/", getProfesores);
router.get("/api/v1/profesores/:nit", getProfesor);

router.post("/api/v1/profesores/", createProfesor);

router.patch("/api/v1/profesores/:nit", updateProfesor);

router.delete("/api/v1/profesores/:nit", deleteProfesor);

export { router };
