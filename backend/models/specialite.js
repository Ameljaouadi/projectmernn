const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const specialiteSchema = new Schema({
    
    name: {
        type :String,
        required : true,
        

    },
    description: {
        type :String,
        required : true,
        

    },
    
   

   
   
});
const specialite = mongoose.model("specialite",specialiteSchema);
module.exports = specialite;