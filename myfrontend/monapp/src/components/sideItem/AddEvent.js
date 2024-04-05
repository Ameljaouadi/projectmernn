// AddPatientCard.js

import Swal from 'sweetalert2';
import React, { useState,useEffect } from 'react';
import { Modal, Select } from 'antd';
import '../../../node_modules/antd/dist/antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { Option } = Select;


const AddEvent = ({ visible, onClose }) => {
  
 
  const [selectedColor, setSelectedColor] = useState('');
 
    const [ docteurs, setDocteurs] = useState([]);
    const [ patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatient] = useState('');
    const [selectedDocteurs, setSelectedDocteurs] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const now = new Date();
    //const endDateTime = new Date(now.getTime() + 30 * 60000); 
    const [newEvent, setNewEvent] = useState({ start: now, end: now });
   
   
    useEffect(() => {
        // Fetch patients and set them in the state
        fetch('http://localhost:3001/routes/api/patient/patientListe')
          .then((response) => response.json())
          .then((data) => {
            console.log('patients data:', data);
    
            setPatients(data);
    
          })
          .catch((error) => console.error('Error fetching patients', error));
        
          // Fetch docteurs and set them in the state
        fetch('http://localhost:3001/routes/api/docteur/docteurListe')
        .then((response) => response.json())
        .then((data) => {
          console.log('docteurs data:', data);
  
          setDocteurs(data);
  
        })
        .catch((error) => console.error('Error fetching docteurs', error));
      
        }, []);

      

        

  const handleAddEvent = async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const isoStartDate = newEvent.start.toISOString();
            const isoEndDate = newEvent.end.toISOString();
           
            const requestBody = {
              docteur: selectedDocteurs,
                patient: selectedPatients,
                start: isoStartDate,
                end: isoEndDate,
                color: selectedColor,
            };
            console.log('Request Body:', JSON.stringify(requestBody));

             fetch('http://localhost:3001/routes/api/event/addEvent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
              
            })
              .then((res) =>{
                console.log('Server Response:', res);
                if (res.status === 201) {
                  return res.json(); // Parse the response body for success status
                } else if (res.status === 400) {
                  // Handle specific status for existing event
                  return res.json();
              } else {
                  // Handle other response statuses if needed
                  console.error('Unexpected server response:', res);
                  throw new Error('Unexpected server response');
              }
          })
              .then((data) => {
                console.log(data, 'userRegister');
                
                
                if (data.status === 'ok') {
                  Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'Ajout Avec Succès!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  // Close the modal
                 onClose(); 
            
                 
                
                }
                else if (data.status === 'error' || data.msg === 'event existe déjà!!') {
                  console.log(data);
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Événement existant',
                    text: 'Cet événement existe déjà à la même date.',
                    showConfirmButton: true,
                  });
                } 



                
                else{
                  console.log(data);
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Veuillez Verifier!!',
                    showConfirmButton: true,
                    })
                  
                }
                 
        
              })
              .catch((error) => console.error('Error during registration:', error.message)

              )
              .finally(() => {
                setLoading(false);
        
              });
        
        
          };

  
     
  
    return (
      <Modal
        title="Ajouter un nouveau Rendez-vous"
        open={visible}
        onCancel={onClose}
        
      >
           <form  onSubmit={handleAddEvent}>
           
          
            

           <div className="mb-3">
          
            
                 <label>Docteur</label>
                <Select
                  placeholder="Sélectionner le docteur"
                  style={{ width: '100%' }}
                  onChange={(value) => setSelectedDocteurs(value)}
                  >
                 {
                  docteurs.map((docteur) => (
                  <Option key={docteur._id} value={docteur.name}>
                  {docteur.name}
                  </Option>
                   ))}
                </Select>
              </div>

              <div className="mb-3">
                 <label>Patient</label>
                <Select
                  placeholder="Sélectionner le patient"
                  style={{ width: '100%' }}
                  onChange={(value) => setSelectedPatient(value)}
                  >
                 {
                  patients.map((patient) => (
                  <Option key={patient._id} value={patient.name}>
                  {patient.name}
                  </Option>
                   ))}
                </Select>
              </div>
            
              <DatePicker
                placeholderText="Date Début"
                 style={{ marginRight: "10px" }}
                 showTimeSelect
                 timeIntervals={30}
                 selected={newEvent.start}
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                 
                  
                  minTime={new Date(2023, 0, 2, 8, 0, 0)}  // 08:00 AM
                  maxTime={new Date(2023, 0, 2, 18, 0, 0)}  // 06:00 PM
             
             />

              <DatePicker
                 placeholderText="Date Fin"
                  style={{ marginRight: "10px" }}
                   showTimeSelect
                   timeIntervals={30}
                   selected={newEvent.end}
                   onChange={(end) => setNewEvent({ ...newEvent, end })}
                  
                   
                   minTime={new Date(2023, 0, 2, 8, 0, 0)}  // 08:00 AM
                   maxTime={new Date(2023, 0, 2, 18, 0, 0)}  // 06:00 PM
                 
                    
                    
                    
                    />
                
                    <div className="mb-3">
                      <label>Couleur</label>
                       <Select
                        placeholder="Sélectionner la couleur"
                        style={{ width: '100%' }}
                        onChange={(value) => setSelectedColor(value)}
                      >
                        
                        
                        <Option value="blue">Bleu</Option>
                        <Option value="green">Vert</Option>
                        <Option value="yellow">Jaune</Option>
                        <Option value="orange">Orange</Option>
                        <Option value="purple">Violet</Option>
                        <Option value="pink">Rose</Option>
                        {/* Add more color options as needed */}
                      </Select>
                    </div>

       
        
               <div className="d-grid">
                 <button type="submit" className="btn btn-primary">
                   Ajouter
                 </button>
              </div>
  
                
         
           
          </form>
        
      </Modal>
    );
  };
  
  export default AddEvent;