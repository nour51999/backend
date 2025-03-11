import Router from "express";
import { createJob, deleteJob, patchJob, getJobs } from "../Controllers/jobControllers.js";

const router = Router();

// Définition des routes
router.get("/", getJobs); // Récupérer tous les jobs
router.post("/", createJob); // Ajouter un job
router.patch("/:id", patchJob); // Mettre à jour un job
router.delete("/:id", deleteJob); // Supprimer un job

export default router;
