import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import { nanoid } from 'nanoid';

const app = express();

let jobs = [
    { id: nanoid(), position: "Software Developer", company: "Google" },
    
    { id: nanoid(), position: "Frontend Developer", company: "YouTube" }
];

// Logger pour le mode développement
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware pour parser le JSON
app.use(express.json());

// Route pour récupérer tous les jobs
app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({ jobs });
});

// Route pour ajouter un nouveau job
app.post('/api/v1/jobs', (req, res) => {
    const { company, position } = req.body;

    if (!company || !position) {
        return res.status(400).json({ message: "Veuillez fournir 'company' et 'position'." });
    }

    const newJob = { id: nanoid(), company, position };
    jobs.push(newJob);

    res.status(201).json({ message: "Job ajouté avec succès", job: newJob });
});
//supprimer un seule job
app.delete('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = jobs.length;

    jobs = jobs.filter(job => job.id !== id);

    if (jobs.length === initialLength) {
        return res.status(404).json({ message: "Job non trouvé." });
    }

    res.status(200).json({ message: "Job supprimé avec succès." });
});
//patch la modification  partielement put modification entière et partiel 
app.patch('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { company, position } = req.body;

    let job = jobs.find(job => job.id === id);

    if (!job) {
        return res.status(404).json({ message: "Job non trouvé." });
    }

    // Mise à jour des champs s'ils sont fournis
    if (company) job.company = company;
    if (position) job.position = position;

    res.status(200).json({ message: "Job mis à jour avec succès.", job });
});
//gestion des route indésirable dans postmane
app.use('*',(req,res)=>{
    res.status(404).json({message:"route inéxistable"})
})
app.use((error,req,res,next)=>{
 res.status(500).json({message:"sometingwont went wrong "})
})
// Route de base
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des jobs !");
});

// Définition du port
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
