const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors")
const register= require("./routes/api/Register");
const login = require("./routes/api/login");
const bcrypt = require('bcrypt');
const docteur = require("./routes/api/docteur");
const patient = require("./routes/api/patient");
const event = require('./routes/api/event');
const specialite =require("./routes/api/specialiteApi");
const admin = require("./routes/api/admin")

const app = express();
app.use(express.json());
app.use(cors());
//connect to database
const mongo_url = config.get("mongo_url");
mongoose.set('strictQuery', true);
mongoose.connect(mongo_url, { useNewUrlParser:true , useUnifiedTopology:true })
.then(() =>console.log("MongoDB connected..."))
.catch((err) =>console.log(err));




app.use("/routes/api/Register",register);
app.use("/routes/api/login",login);
app.use("/routes/api/docteur",docteur);
app.use("/routes/api/patient",patient);
app.use('/uploads', express.static('uploads'));
app.use('/routes/api/specialiteApi',specialite);
app.use('/routes/api/event',event);
app.use('/routes/api/admin',admin);




const port = process.env.PORT || 3001;



app.listen(port, () =>console.log(`Server running on port ${port}`));

