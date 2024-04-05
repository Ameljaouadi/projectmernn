import Swal from 'sweetalert2';

import React, { useState,useEffect } from 'react';
import { Modal, Select } from 'antd';
const { Option } = Select;

const AddDoctorCard = ({ visible, onClose, onAddDoctor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ specialite, setSpecialite] = useState('');
  const [prixVisite, setPrixVisite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [ specialites, setSpecialites] = useState([]);



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    // Fetch specialites and set them in the state
    fetch('http://localhost:3001/routes/api/specialiteApi/specialiteListe')
      .then((response) => response.json())
      .then((data) => {
        console.log('Specialites data:', data);

        setSpecialites(data);

      })
      .catch((error) => console.error('Error fetching specialites', error));
  }, []);

 
  const handleAddDoctor = (e) => {
    e.preventDefault();
    

    console.log(name, email, password, telephone,specialite,prixVisite,adresse); 
       setError(null);
       setLoading(true);

       const requestBody = {
     name,
     email,
     password,
     specialite: selectedSpecialite,
     telephone,
     prixVisite,
     adresse,
    
       }
  

    fetch('http://localhost:3001/routes/api/docteur/ajoutDoctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Response data:', data);
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

         // Update the table by calling the onAddDoctor function
         onAddDoctor();
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
      title="Ajouter un Docteur"
      open={visible}
      onCancel={onClose}
      
    >
         <form onSubmit={handleAddDoctor}  >
         
        
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
                 <label>Spécialité</label>
                <Select
                  placeholder="Sélectionner une spécialité"
                  style={{ width: '100%' }}
                  onChange={(value) => setSelectedSpecialite(value)}
                  >
                 {
                  specialites.map((specialite) => (
                  <Option key={specialite._id} value={specialite.name}>
                  {specialite.name}
                  </Option>
                   ))}
                </Select>
              </div>
              <div className="mb-3">
              <label>Prix Visite</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setPrixVisite(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Adresse</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setAdresse(e.target.value)}
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

export default AddDoctorCard;