const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Patient = require("../../models/patient");
const Docteur = require("../../models/doctor");




const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 


// @route POST api/Register/register
// @desc Register new patient 
// @access Public
// Assuming this code is in your server-side registration route

router.post("/register",upload.single('photo'), async (req, res) => {
  const { name, email, password, telephone, datanaissance } = req.body;
  // Access photo from request file
  const image = req.file ? req.file.path : null;

  if (!name || !email || !password || !datanaissance || !telephone) {
    return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
  }

  try {
    // Check if the email already exists
    const existingPatient = await Patient.findOne({ email });
    const existingDocteur = await Docteur.findOne({ email });

    if (existingPatient || existingDocteur) {
      return res.status(400).json({ status: "userexists", msg: "Ce compte Exist déja!!" });
    }

  
    // Create a new user based on the role
    const newPatient = new Patient({
       name, 
       email,
        password,
        telephone,
         DateNaissance: new Date(), 
         image,
        });//


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newPatient.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await newPatient.save();

    // Respond with a success message
    res.status(200).json({ status: "ok", msg: "Enregistrement avec succèes" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ status: "error", msg: "An error occurred during registration. Please try again." });
  }
});

module.exports = router;
/*const User = require("../../models/user");
// @route POST api/Register/register
//@desc Register new user
//@access Public 
router.post("/register", (req,res)=> {
    let {name,email,password, role="user"} = req.body;
    if (!name || !email || !password || !role)
    return res.status(400).send({msg: "please enter all data"});
User.findOne({ email: email }).then((user)=>{
    if(user) return res.status(400).send({msg:"Email already exist"});
});
let newUser = new User({name,email,password,role});
bcrypt.genSalt(10,(err,salt) => {
    if(err) throw err;
    bcrypt.hash(newUser.password, salt,(err,hash) => {
        if(err) throw err;
        newUser.password= hash;
        newUser.save().then((user) => {
            jwt.sign(
                { id: user.id},
                config.get('jwtSecret'),{expiresIn :config.get("tokenExpire") },
                (err,token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                    });
                }

             );
        });
    });
   });
});

module.exports=router;*/
