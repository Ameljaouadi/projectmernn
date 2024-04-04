const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PatientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type :String,
        required : true,
        Unique : true,

    },
    password : {
        type : String,
        required : true,
    },
    telephone : {
        type : Number,
        required : true,
    },

    DateNaissance : {
        type : Date,
        required :true,
    },
  
  
   
   
});
const patient = mongoose.model("patients",PatientSchema);
module.exports = patient;
