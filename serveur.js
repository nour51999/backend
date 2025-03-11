import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

import express from "express";
import morgan from "morgan";

import jobRoutes from './Routes/jobRoutes.js'; 

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Logger pour le mode développement
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use("/api/v1/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des jobs !");
});

// Middleware pour gérer les routes inexistantes
app.use('*', (req, res) => {
    res.status(404).json({ message: "Route inexistante" });
});

// Middleware pour gérer les erreurs globales
app.use((error, req, res, next) => {
    console.error(error); // Pour debug
    res.status(500).json({ message: "Something went wrong" });
});

// Connexion à MongoDB et démarrage du serveur
// const PORT = process.env.PORT || 5100;
// app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
// const MONGO_URL = process.env.MONGO_URL;

    try {
      
      console.log(" Connexion à MongoDB réussie");
  
     
    } catch (error) {
      console.error(" Erreur de connexion à MongoDB :", error.message);
      
    }
  
  


