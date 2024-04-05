// UpdateDoctorCard.js
import Swal from 'sweetalert2';

import React, { useState, useEffect } from 'react';
import { Modal,Select } from 'antd';
const { Option } = Select;
const UpdateDoctorCard = ({ visible, onClose, onAddDoctor, selectedDoctor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ specialite, setSpecialite] = useState('');
  const [prixVisite, setPrixVisite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [ specialites, setSpecialites] = useState([]);

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resetFormFields = () => { //hetha bech yfara8 textfiled
    setEmail('');
    setPrixVisite('');
    setTelephone('');
    setAdresse('');
    setName('');
    setPassword('');
   
  };
  useEffect(() => {
   
    // Fetch specialites and set them in the state
    fetch('http://localhost:3001/routes/api/specialiteApi/specialiteListe')
      .then((response) => response.json())
      .then((data) => {

        setSpecialites(data);
      })
      .catch((error) => console.error('Error fetching specialites', error));

    // If the selectedDoctor prop changes, update the form fields
    if (selectedDoctor) {
      console.log('Selected Docteur:', selectedDoctor);

      setName(selectedDoctor.name || '');
      setEmail(selectedDoctor.email || '');
      setTelephone(selectedDoctor.telephone || '');
      setSpecialite(selectedDoctor.selectedSpecialite || '');
      setPrixVisite(selectedDoctor.prixVisite || '');
      setAdresse(selectedDoctor.adresse || '');
      

      }
    }, [selectedDoctor]);
   

  
  const handleUpdateDoctor = (e) => {
    e.preventDefault();
      // Vérifier si tous les champs obligatoires sont remplis
  if (!name || !email || !telephone || !adresse || !prixVisite) {
    // Afficher un message d'erreur
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Veuillez remplir tous les champs obligatoires!',
      showConfirmButton: true,
    });
    return; // Arrêter le traitement si des champs sont manquants
  }
  console.log(name, email, adresse, password,telephone,prixVisite,selectedSpecialite); 
      
  setLoading(true);
    const requestBody = {
    
     name,
     email,
     password,
     selectedSpecialite,
     telephone,
     prixVisite,
     adresse,
    }



  console.log(selectedDoctor._id)
    fetch(`http://localhost:3001/routes/api/docteur/modifier/${selectedDoctor._id}`, {
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
         // Trigger the callback to update the docteur list in the parent component
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
      title="Modifier Le Compte"
      open={visible}
      onCancel={onClose}
      
    >
         <form onLoad={resetFormFields} onSubmit={handleUpdateDoctor}>
         
        
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
                <label>Mot de Passe</label>
                <input
                  type="text"
                  value={password}
                  className="form-control"
                  placeholder="Entrer Votre Mot de Passe"
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
                 <label>Spécialité</label>
                <Select
                  placeholder="Sélectionner une spécialité"
                  style={{ width: '100%' }}
                  value={selectedSpecialite}
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
                  value={prixVisite}
                  className="form-control"
                  placeholder="Entrer Prix Visite"
                  onChange={(e) => setPrixVisite(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Adresse</label>
              <input
                  type="text"
                  value={adresse}
                  className="form-control"
                  placeholder="Entrer adresse"
                  onChange={(e) => setAdresse(e.target.value)}
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

export default UpdateDoctorCard;