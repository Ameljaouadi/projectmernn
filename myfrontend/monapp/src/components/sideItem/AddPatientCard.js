// AddPatientCard.js
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Modal,DatePicker } from 'antd';
const AddPatientCard = ({ visible, onClose, onAddPatient }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dataNaissance, setNaissance] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetFormFields = () => { //hetha bech yfara8 textfiled
    setEmail('');
    setPassword('');
    setTelephone('');
    setNaissance('');
    setName('');
   
  };
  const handleAddPatient = (e) => {
    e.preventDefault();

    console.log(name, email, password, telephone,dataNaissance); 
       setError(null);
       setLoading(true);

       const requestBody = {
        name,
        email,
        password,
        datanaissance: dataNaissance,
        telephone,
      };



    fetch('http://localhost:3001/routes/api/patient/ajouterPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        alert(data.msg);
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
    
         // Update the table by calling the onAddPatient function
         onAddPatient(); //hethi zeda 
        
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
      title="Ajouter un patient"
      open={visible}
      onCancel={onClose}
      
    >
         <form onLoad={resetFormFields} onSubmit={handleAddPatient}>
         
        
          <div className="mb-3">
            <label>Nom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrer Votre Nom"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>@ Email</label>
            <input
              type="email"
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
                 Ajouter
               </button>
            </div>

              
       
         
        </form>
      
    </Modal>
  );
};

export default AddPatientCard;