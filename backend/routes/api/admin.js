
const router = require("express").Router();
const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');

// @route PUT api/admin/modifier/:id
// @desc Modifier les données d'un admin
// @access Private && ADMIN
router.put("/modifier/:id", async (req, res) => {
  const id = req.params.id;
  console.log("monId "+id);
  const {  password } = req.body;

  console.log("requette " + JSON.stringify(req.body));
  console.log("NVpass "+ password);

  if (!password) {
    return res.status(400).json({ 
      status: "dataincomplete", 
      msg: "Veuillez fournir le nouveau mot de passe!!" });
  }

  try {
    // Find the admin by ID
    const adminToUpdate = await Admin.findById(id);

    if (!adminToUpdate) {
      return  res.status(404).json({
         status: "error", 
         msg: "Admin not found" });
    }

    const salt = await bcrypt.genSalt(10);
    adminToUpdate.password = await bcrypt.hash(password, salt);

    // Save the updated admin data
    await adminToUpdate.save();
    
    res.status(200).json({ 
      status: "ok", 
      msg: "Mot de passe modifié avec succès" });
  } catch (error) {
    console.error("Error during password update:", error);
    res.status(500).json({ 
      status: "error", 
      msg: "An error occurred during password update. Please try again." });
  }
});

module.exports = router;