import { nanoid } from "nanoid";
import Job from "../Models/jobModels.js";

let jobs = [
    { id: nanoid(), position: "Software Developer", company: "Google" },
    { id: nanoid(), position: "Frontend Developer", company: "YouTube" }
];

// Créer un job
export const createJob = async (req, res) => {
    const { company, position } = req.body;
   try {
  
    const job=await Job.create({company,position});
    res.status(201).json({ job });
  
  

   
    
   } catch (error) {
    res.status(500).json({message:"serveur error"})
  
   }
};

// Supprimer un job
export const deleteJob = (req, res) => {
    const { id } = req.params;
    const initialLength = jobs.length;

    jobs = jobs.filter(job => job.id !== id);

    if (jobs.length === initialLength) {
        return res.status(404).json({ message: "Job non trouvé." });
    }

    res.status(200).json({ message: "Job supprimé avec succès." });
};

// Mettre à jour un job
export const patchJob = (req, res) => {
    const { id } = req.params;
    const { company, position } = req.body;

    let job = jobs.find(job => job.id === id);

    if (!job) {
        return res.status(404).json({ message: "Job non trouvé." });
    }

    if (company) job.company = company;
    if (position) job.position = position;

    res.status(200).json({ message: "Job mis à jour avec succès.", job });
};

// Récupérer tous les jobs
export const getJobs = (req, res) => {
    res.status(200).json({ jobs });
};
