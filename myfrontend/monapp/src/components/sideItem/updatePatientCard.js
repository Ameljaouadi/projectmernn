// UpdatePatientCard.js
import Swal from 'sweetalert2';

import React, { useState, useEffect } from 'react';
import { Modal,DatePicker } from 'antd';
const UpdatePatientCard = ({ visible, onClose, onAddPatient, selectedPatient}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dataNaissance, setNaissance] = useState('');
    
    const [loading, setLoading] = useState(false);
    const resetFormFields = () => { //hetha bech yfara8 textfiled
      setEmail('');
      setPassword('');
      setTelephone('');
      setNaissance('');
      setName('');
     
    };
    
  useEffect(() => {
    
   
    // If the selectedPatient prop changes, update the form fields
    if (selectedPatient) {
      console.log('Selected Patient:', selectedPatient);

        setName(selectedPatient.name || '');
        setEmail(selectedPatient.email || '');
        setTelephone(selectedPatient.telephone || '');
        setNaissance(selectedPatient.DateNaissance || '');
        
     

      }
    }, [selectedPatient]);
   

 
  const handleUpdatePatient = (e) => {
    e.preventDefault();
    // Vérifier si tous les champs obligatoires sont remplis
  if (!name || !email || !telephone || !dataNaissance) {
    // Afficher un message d'erreur
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Veuillez remplir tous les champs obligatoires!',
      showConfirmButton: true,
    });
    return; // Arrêter le traitement si des champs sont manquants
  }

    console.log(name, email, password, telephone,dataNaissance); 
      
       setLoading(true);

       const requestBody = {
        name,
        email,
        password,
        datanaissance: dataNaissance,
        telephone,
      };

    fetch(`http://localhost:3001/routes/api/patient/modifier/${selectedPatient._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userUpdate');
        alert(data.msg);
        if (data.status === 'ok') {
          Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Modification Avec Succès!',
            showConfirmButton: false,
            timer: 1500
          });
          // Close the modal
         onClose(); 
         // Trigger the callback to update the patient list in the parent component
         onAddPatient();

        }
         
        else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Veuillez Verifier!!',
            showConfirmButton: true,
            })
          
        }


      })
      .catch((error) => {
        console.error('Error during registration:', error);
      })
      .finally(() => {
        setLoading(false);

      });


  };
   

  return (
    <Modal
      title="Modifier Le Compte"
      open={visible}
      onCancel={onClose}
      
    >
         <form onLoad={resetFormFields} onSubmit={handleUpdatePatient}>
         
        
          <div className="mb-3">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              className="form-control"
              placeholder="Entrer Votre Nom"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>@ Email</label>
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="Entrer Votre Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Mot De Passe</label>
            <input
              type="password"
              
              className="form-control"
              placeholder="Entrer Votre Mot De Passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
              <div className="mb-3">
                <label>Téléphone</label>
                <input
                  type="text"
                  value={telephone}
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="mb-3">
               <label>Date de Naissance</label>
               <DatePicker className="form-control" 
                 placeholder="Sélectionnez la date de naissance"
                   onChange={(date, dateString) => setNaissance(dateString)}
               />
              </div>
            
             <div className="d-grid">
               <button type="submit" className="btn btn-primary">
                 Modifier
               </button>
            </div>

              
       
         
        </form>
      
    </Modal>
  );
};

export default UpdatePatientCard;