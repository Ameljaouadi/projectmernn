const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    
    patient_id: {
        type :String,
        required : true,
        Unique : true,

    },
    docteur_id: {
        type : String,
        required : true,
    },
   

    Date_deb : {
        type : Date,
        required :true,
    },
    
    Date_fin : {
        type : Date,
        required :true,
    },
    color: {
        type: String,
        required : true,
    }

   
   
});
const Event = mongoose.model("Rendezvous",eventSchema);
module.exports = Event;