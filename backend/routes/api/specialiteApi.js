const router = require("express").Router();
const Specialite = require('../../models/specialite');

// @route POST api/specialiteApi/ajouterSpecialite
// @desc Ajouter un nouvelle specialite

router.post('/ajouterSpecialite', async (req, res) => {
  console.log("Request body:", req.body);
    const { name, description } = req.body;
     console.log(name);
    if ( !name || !description  ) {
      return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout le champ Spécialité!!" });
    }
    try {
    // Vérifier si specialite existe déjà
      const existingS = await Specialite.findOne({ name });
     if (existingS) {
      return res.status(400).json({ msg: 'La spécialité existe déjà!!' });
     }

   // Create a new specialite 
      const newS = new Specialite({
           name, 
           description,
          
          });// 
  
  // Save the new S to the database
         await newS.save();
      
       res.status(200).json({ status: "ok", msg: "Enregistrement avec succèes" });
} catch (error) {
  console.error("Error during registration:", error);
  res.status(500).json({ status: "error", msg: "An error occurred during registration. Please try again." });
}
 
});



      // @route GET api/specialiteApi/specialiteListe
// @desc Afficher la liste des specialites
// @access Private && ADMIN
router.get('/specialiteListe', async (req, res) => {

  try {
       let specialites;
        // Check if the search parameter is provided
       if (req.query.search) {
      // If search parameter is provided, filter patients based on the name
      specialites = await Specialite.find({
          name: { $regex: new RegExp(req.query.search, 'i') }
          });
        } else {
      // If no search parameter, fetch all patients
      specialites = await Specialite.find();
      }

        console.log('Successfully fetched specialites:',specialites);
        res.json(specialites);
        } catch (error) {
        console.error('Error fetching specialites:', error.message);
        res.status(500).json({ error: error.message });
        }

  });

  // @route DELETE api/specialiteApi/supprimer/:id
// @desc Supprimer un specialite
// @access Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
  try {
    const deletedspecialite = await Specialite.findByIdAndDelete(req.params.id);

    if (!deletedspecialite) {
      return res.status(404).json({ msg: 'Specialite not found' });
    }


    // Fetch the updated list of specialites after deletion
    const updatedspecialites = await Specialite.find();

    res.status(200).json(updatedspecialites);
    } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erreur lors de la suppression de specialite"});
  }
});


//get number of docteurs 
// @route GET api/docteur/specialiteCount
// @desc Get the number of specialites
// @access Private && ADMIN
router.get('/specialiteCount', async (req, res) => {
  try {
    
      
      //count specialites 
    const  count = await Specialite.countDocuments(); //La fonction est asynchrone, d'où l'utilisation du mot-clé await.
       
    console.log('Successfully fetched specialite count:', count);
    res.json({ specialiteCount: count });
  } catch (error) {
    console.error('Error fetching specialite count:', error.message);
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;