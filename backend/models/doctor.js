const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DocSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // required c'est pour obligatoire
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
        required: true,
    },

    specialite: {
        type: String,
        required: true,

    },
    prixVisite: {
        type: Number,
        required: true,


    },
    adresse: {
        type: String,
        required: true,

    },
  
});
const doctor = mongoose.model("doctors", DocSchema);
module.exports = doctor;
