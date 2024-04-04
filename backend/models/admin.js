const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    
    name: {
        type :String,
        required : true,
        

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

   
   
});
const admin = mongoose.model("admin",AdminSchema);
module.exports = admin;