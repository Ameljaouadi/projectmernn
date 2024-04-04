const router = require("express").Router();
const Docteur = require('../../models/doctor');
const multer = require('multer');
const upload = multer({ dest: 'photoDoc/' }); 
const bcrypt = require('bcrypt');
const doctor = require("../../models/doctor");


// @route POST api/docteur/ajouter
// @desc Ajouter un nouvel utilisateur

router.post('/ajoutDoctor', async (req, res) => {
 

  const { name, email, password, telephone, specialite,prixVisite,adresse } = req.body;
 

  if (!name || !email || !password || !telephone || !specialite || !prixVisite || !adresse) {
    return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
  }
  try {
  // Vérifier si l'utilisateur existe déjà
    const existingDoctor = await Docteur.findOne({ email });
   if (existingDoctor) {
    return res.status(400).json({ msg: 'Le Docteur existe déjà!!' });
   }

 // Create a new user based on the role
    const newDoctor = new Docteur({
         name, 
         email,
         password,
         telephone,
         specialite,
         prixVisite,
         adresse,
        
        });// 
       

 // Hash the password
       const salt = await bcrypt.genSalt(10);
     newDoctor.password = await bcrypt.hash(password, salt);

// Save the new user to the database
       await newDoctor.save();
     res.status(200).json({ status: "ok", msg: "Enregistrement avec succèes" });
} catch (error) {
  console.error('Error during registration:', error);
  res.status(500).json({ status: 'error', msg: 'An error occurred during registration. Please try again.' });
}

});



  // @route GET api/docteur/docteurListe
// @desc Afficher la liste des docteurs
// @access Private && ADMIN
router.get('/docteurListe', async (req, res) => {

    try {
        let docteurs;  
        if (req.query.search) {
             docteurs=await Docteur.find({
              name: { $regex: new RegExp(req.query.search, 'i') }
            });
        } else{
          docteurs = await Docteur.find();
        }
       console.log('Successfully fetched doctors:', docteurs);

        res.json(docteurs);
    } catch (error) {
      console.error('Error fetching doctors:', error.message);

      res.status(500).json({ error: error.message });


    }});



    /********************************modifier**************************************** */
    router.put("/modifier/:id", async (req, res) => {
    
      const { name, email,  telephone, specialite,prixVisite,adresse,password } = req.body;
     
      if (!name || !email ||  !telephone || !specialite || !prixVisite || !adresse || !password) {
        return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
      }
      try{
        const doctorToUpdate = await Docteur.findById(req.params.id);
        if (!doctorToUpdate) {
          return res.status(404).json({ msg: "Doctor not found" });
        }
        doctorToUpdate.name = name;
        doctorToUpdate.email=email;
        doctorToUpdate.password=password;
        doctorToUpdate.telephone=telephone;
        doctorToUpdate.specialite=specialite;
        doctorToUpdate.prixVisite=prixVisite;
        
        doctorToUpdate.adresse=adresse;
        
        await patientToUpdate.save();
        
      
        res.status(200).json({ status: "ok", msg: "Modification avec succès" });
      } catch (error) {
        console.error("Error during modification:", error);
        res.status(500).json({ status: "error", msg: "An error occurred during modification. Please try again." });
     }

      
    });



    // @route DELETE api/docteur/supprimer/:id
// @desc Supprimer un docteur
// @access Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
  try {
    const deletedDocteur = await Docteur.findByIdAndDelete(req.params.id);

    if (!deletedDocteur) {
      return res.status(404).json({ msg: 'Docteur not found' });
    }


    // Fetch the updated list of Docteurs after deletion
    const updatedDocteurs = await Docteur.find();

    res.status(200).json(updatedDocteurs);
    } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erreur lors de la suppression de l'utilisateur"});
  }
});


//get number of docteurs 
// @route GET api/docteur/docteurCount
// @desc Get the number of docteurs
// @access Private && ADMIN
router.get('/docteurCount', async (req, res) => {
  try {
    
      
      //count patients 
    const  count = await Docteur.countDocuments(); //La fonction est asynchrone, d'où l'utilisation du mot-clé await.
       
    console.log('Successfully fetched docteur count:', count);
    res.json({ docteurCount: count });
  } catch (error) {
    console.error('Error fetching docteur count:', error.message);
    res.status(500).json({ error: error.message });
  }
});




// Endpoint pour récupérer les détails d'un docteur par ID
router.get('/getDoctorDetails/:id', async (req, res) => {
  try {
    const doctorDetails = await Docteur.findById(req.params.id);
    console.log("dtails:"+doctorDetails)
    if (!doctorDetails) {
      return res.status(404).json({ msg: 'Docteur not found' });
    }
    res.json(doctorDetails);
  } catch (error) {
    console.error('Error fetching doctor details:', error.message);
    res.status(500).json({ error: error.message });
  }
});

   /********************************modifier**************************************** */
   router.put("/modifierProfil/:id", async (req, res) => {
    
    const { telephone, prixVisite,adresse,password } = req.body;
    const id=req.params.id;
    if (  !telephone  || !prixVisite || !adresse || !password) {
      return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
    }
    try{
      const doctorToUpdate = await Docteur.findById(id);
      if (!doctorToUpdate) {
        return res.status(404).json({ msg: "Doctor not found" });
      }
      
      doctorToUpdate.password=password;
      doctorToUpdate.telephone=telephone;
      doctorToUpdate.prixVisite=prixVisite;
      doctorToUpdate.adresse=adresse;
       // Hash the new password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      doctorToUpdate.password = await bcrypt.hash(password, salt);
    }

      
      await doctorToUpdate.save();
      
    
      res.status(200).json({ status: "ok", msg: "Modification avec succès" });
    } catch (error) {
      console.error("Error during modification:", error);
      res.status(500).json({ status: "error", msg: "An error occurred during modification. Please try again." });
   }

    
  });






    module.exports = router;


