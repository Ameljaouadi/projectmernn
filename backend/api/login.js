const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const Patient = require("../../models/patient"); // Change this import to the correct model

const Doctor = require("../../models/doctor");
const Admin = require("../../models/admin");

// @route POST api/login-user
// @desc Login user (including doctors and admins)
// @access Public


const getUserModel = (role) => {
  
  switch (role) {
    case "admin":
      return Admin;
    case "docteur":
      return Doctor;
    case "patient":
      return Patient;
    default:
      return null;
  }
};


router.post("/login-user", async (req, res) => {
  const { email, password,role } = req.body;
  console.log("Role received from frontend:", role); // Add this line for debugging


  if (!email || !password || !role) {
    return res.status(400).json({ status: "dataincomplete", msg: "Please enter all data" });
  }
  const userModel = getUserModel(role); // Get the actual model
  if (!userModel) {
    return res.status(400).json({ status: "invalidrole", msg: "Invalid role" });
  }



  // Change User.findOne to the correct model (Patient.findOne)
  userModel.findOne({ email: email }).then((user) => {
    
    if (!user) {
      return res.status(400).send({ status: "usernotok", msg: "User does not exist" });
    }
    console.log(user.name)

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).send({ status: "passnotok", msg: "Mot de passe incorrect" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpire") },
        async (err, token) => {
          if (err) throw err;

          // Change the status code to 200 for success
          return res.status(200).json({
             status: "ok",
            
              msg: "ok",
              
               data: token ,
               id: user._id,
               name: user.name,
               email: user.email
              });
        }
      );
    });
  });


});







module.exports = router;
