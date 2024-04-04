// routes/api/event.js
const router = require('express').Router();

const Event =require('../../models/event')
// POST route to add a new event
// @route POST api/event/addEvent
// @desc Ajouter un event

router.post('/addEvent', async (req, res) => {


    const { docteur_id, patient_id, start, end , color} = req.body;

    console.log('Received data:', req.body);
  
    
    if (!docteur_id || !patient_id  || !start|| !end || !color ) {
      return res.status(400).json({ status: "dataincomplete", msg: "Veuillez remplir tout les champs!!" });
    }
    try {
    // Vérifier si l'utilisateur existe déjà
      const existingEvent = await Event.findOne({ 
        docteur_id , 
        $or: [
          { Date_deb: { $lt: end }, Date_fin: { $gt: start } }, // Existing event starts before new event ends and ends after new event starts
          { Date_deb: { $gte: start, $lt: end } }, // Existing event starts during the new event
          { Date_fin: { $gt: start, $lte: end } } // Existing event ends during the new event
      ]
      
      
      });
     if (existingEvent) {
     
      return res.status(400).json({ msg: 'event existe déjà!!' });
      

     }

    // Create a new event using your Event model
    const newEvent = new Event({
      docteur_id,
      patient_id,
      Date_deb: start, 
      Date_fin: end, 
      color,

    });
    console.log('Before saving event:', newEvent);


    console.log(docteur_id,patient_id,start, end)
    // Save the event to the database
    await newEvent.save();
    console.log('After saving event');

    res.status(201).json({ status: 'ok',message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event', error);
    res.status(500).json({ status: 'error', message: `Internal Server Error: ${error.message}` });
  }
  

});

// GET route to get all events
// @route GET api/event/getAllEvents
// @desc Get all events
router.get('/getAllEvents', async (req, res) => {
  try {
      // Query the database to get all events
      const allEvents = await Event.find();
      res.status(200).json(allEvents);
  } catch (error) {
      console.error('Error fetching all events', error);
      res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});

// @route DELETE api/event/supprimer/deleteEvent/:eventId
// @desc Supprimer un event
// @access Private && ADMIN
router.delete('/deleteEvent/:eventId', async(req,res)=> {
  const eventId = req.params.eventId;
  try {
    // Utilisez la méthode findByIdAndDelete pour supprimer l'événement
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      // Si aucun événement n'est trouvé, renvoyez une réponse appropriée
      return res.status(404).json({ message: "Event not found" });
    }
     // Renvoie une réponse JSON indiquant la réussite de la suppression
     res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      // En cas d'erreur, renvoyez une réponse d'erreur
      console.error('Error deleting event', error);
      res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }


});


// routes/api/event.js
// ... (other imports and routes)

// @route PUT api/event/updateEvent/:eventId
// @desc Update an event
// @access Private && ADMIN
router.put('/updateEvent/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const { docteur_id, patient_id, start, end, color } = req.body;

  try {
    // Check if the event exists
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check for any overlapping events
    const overlappingEvent = await Event.findOne({
      _id: { $ne: eventId }, // Exclude the current event
      docteur_id,
      $or: [
        { Date_deb: { $lt: end }, Date_fin: { $gt: start } }, // Existing event starts before new event ends and ends after new event starts
        { Date_deb: { $gte: start, $lt: end } }, // Existing event starts during the new event
        { Date_fin: { $gt: start, $lte: end } }, // Existing event ends during the new event
      ],
    });

    if (overlappingEvent) {
      return res.status(400).json({ msg: 'Overlapping event exists' });
    }

    // Update the existing event
    existingEvent.docteur_id = docteur_id;
    existingEvent.patient_id = patient_id;
    existingEvent.Date_deb = start;
    existingEvent.Date_fin = end;
    existingEvent.color = color;

    // Save the updated event to the database
    await existingEvent.save();

    res.status(200).json({ status: 'ok', message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event', error);
    res.status(500).json({ status: 'error', message: `Internal Server Error: ${error.message}` });
  }
});


// GET route to get events for a specific doctor
// @route GET api/event/getDoctorEvents/:doctorId
// @desc Get events for a specific doctor
router.get('/getDoctorEvents/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    // Query the database to get events for the specified doctor
    const doctorEvents = await Event.find({ docteur_id: doctorId });
    console.log("event are"+doctorEvents)
    res.status(200).json(doctorEvents);
  } catch (error) {
    console.error('Error fetching doctor events', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});
// GET route to get events for a specific patient
// @route GET api/event/getPatientEvents/:patientId
// @desc Get events for a specific doctor
router.get('/getPatientEvents/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    // Query the database to get events for the specified patient
    const patientEvents = await Event.find({ patient_id: patientId });
    console.log("event are"+patientEvents)
    res.status(200).json(patientEvents);
  } catch (error) {
    console.error('Error fetching patient events', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});







module.exports = router;

