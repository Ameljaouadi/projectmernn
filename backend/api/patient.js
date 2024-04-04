
const router = require("express").Router();
const Patient = require('../../models/patient');

const bcrypt = require('bcrypt');


// @route POST api/patient/ajouter
// @desc Ajouter un nouvel utilisateur

router.post('/ajouterPatient', async (req, res) => {
   
      const { name, email, password, telephone, datanaissance } = req.body;
      console.log('Received data:', req.body);




      if (!name || !email || !password || !datanaissance || !telephone) {
        return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
      }
      try {
      // Vérifier si l'utilisateur existe déjà
        const existingPatient = await Patient.findOne({ email });
       if (existingPatient) {
        return res.status(400).json({ msg: 'Le patient existe déjà!!' });
       }
  
     // Create a new user based on the role
        const newPatient = new Patient({
             name, 
             email,
            password,
              telephone,
             DateNaissance: new Date(), 
             

            });// 
     // Hash the password
           const salt = await bcrypt.genSalt(10);
         newPatient.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
           await newPatient.save();
         res.status(200).json({ status: "ok", msg: "Enregistrement avec succèes" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ status: "error", msg: "An error occurred during registration. Please try again." });
  }
   
  });
   






// @route DELETE api/patient/supprimer/:id
// @desc Supprimer un patient
// @access Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }


    // Fetch the updated list of patients after deletion
    const updatedPatients = await Patient.find();

    res.status(200).json(updatedPatients);
    } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erreur lors de la suppression de l'utilisateur"});
  }
});



      // @route GET api/patient/patientListe
// @desc Afficher la liste des patients
// @access Private && ADMIN
router.get('/patientListe', async (req, res) => {

  try {
       let patients;
       
        // Check if the search parameter is provided
       if (req.query.search) {
      // If search parameter is provided, filter patients based on the name
         patients = await Patient.find({
          name: { $regex: new RegExp(req.query.search, 'i') }
          });
        } else {
      // If no search parameter, fetch all patients
        patients = await Patient.find();
      }

      // Format the date of birth for each patient
       const formattedPatients = patients.map(patient => ({
         ...patient._doc,
        DateNaissance: patient.DateNaissance.toLocaleDateString(),
        }));

        console.log('Successfully fetched patients:', formattedPatients);
        res.json(formattedPatients);
        } catch (error) {
        console.error('Error fetching patients:', error.message);
        res.status(500).json({ error: error.message });
        }

  });

/*partie modifier*/ 
// @route PUT api/patient/modifier/:id
// @desc Modifier les données d'un patient
// @access Private && ADMIN
router.put("/modifier/:id",  async (req, res) => {
  const { name, email, password, telephone, datanaissance } = req.body;
  

  if (!name || !email || !password || !datanaissance || !telephone) {
    return res
      .status(400)
      .json({ status: "dataincomplete", msg: "Veuillez remplir tous les champs!!" });
  }

  try {
    // Find the patient by ID
    const patientToUpdate = await Patient.findById(req.params.id);

    if (!patientToUpdate) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Update patient data
    patientToUpdate.name = name;
    patientToUpdate.email = email;
    patientToUpdate.password = password;
    patientToUpdate.telephone = telephone;
    patientToUpdate.DateNaissance = datanaissance;
   

    // Hash the new password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      patientToUpdate.password = await bcrypt.hash(password, salt);
    }

    // Save the updated patient data
    await patientToUpdate.save();
    
  
    res.status(200).json({ status: "ok", msg: "Modification avec succès" });
  } catch (error) {
    console.error("Error during modification:", error);
    res.status(500).json({ status: "error", msg: "An error occurred during modification. Please try again." });
 }
});

//get number of patients 
// @route GET api/patient/patientCount
// @desc Get the number of patients
// @access Private && ADMIN
router.get('/patientCount', async (req, res) => {
  try {
    
      
      //count patients 
    const  count = await Patient.countDocuments(); //La fonction est asynchrone, d'où l'utilisation du mot-clé await.
       
    console.log('Successfully fetched patient count:', count);
    res.json({ patientCount: count });
  } catch (error) {
    console.error('Error fetching user count:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pour récupérer les détails d'un patient par ID
router.get('/getPatientDetails/:id', async (req, res) => {
  try {
    const patientDetails = await Patient.findById(req.params.id);
    if (!patientDetails) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.json(patientDetails);
  } catch (error) {
    console.error('Error fetching patient details:', error.message);
    res.status(500).json({ error: error.message });
  }
});


/*partie modifier*/ 
// @route PUT api/patient/modifierProfil/:id
// @desc Modifier les données d'un patient
// @access Private && ADMIN
router.put('/modifierProfil/:id',  async (req, res) => {
  const {  password, telephone, datanaissance } = req.body;
  
  const id = req.params.id;
  if ( !password || !datanaissance || !telephone) {
    return res
      .status(400)
      .json({ status: "dataincomplete", msg: "Veuillez remplir tous les champs!!" });
  }

  try {
    // Find the patient by ID
    const patientToUpdate = await Patient.findById(id);

    if (!patientToUpdate) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Update patient data
   
    patientToUpdate.password = password;
    patientToUpdate.telephone = telephone;
    patientToUpdate.DateNaissance = datanaissance;
   

    // Hash the new password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      patientToUpdate.password = await bcrypt.hash(password, salt);
    }

    // Save the updated patient data
    await patientToUpdate.save();
    
  
    res.status(200).json({ status: "ok", msg: "Modification avec succès" });
  } catch (error) {
    console.error("Error during modification:", error);
    res.status(500).json({ status: "error", msg: "An error occurred during modification. Please try again." });
 }
});





  

  module.exports = router;