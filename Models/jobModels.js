import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
    type:String,
    enum:['interview','declined','pending'],
    default:'pending'
    

    },
    jobtype:{
        type:String,
        enum:['ful-time','part-time','internship'],
        default:'full-time',

    },
    joblocation:{
        type:String,
        default:"my city"
    },

   

    
},
{timestamps:true}//afficher l'heure et date automatiquement

);
export default mongoose.model("Job",jobSchema);