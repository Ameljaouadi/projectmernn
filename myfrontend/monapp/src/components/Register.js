import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

import './style2.css';
import { DatePicker } from 'antd';
import Swal from 'sweetalert2';


export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dataNaissance, setNaissance] = useState('');
  

  const navigate = useNavigate();  // Initialisez useHistory

  
 

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(name, email, password, telephone,dataNaissance); 
     

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('datanaissance', dataNaissance);
    formData.append('telephone', telephone);
 




    fetch('http://localhost:3001/routes/api/Register/register', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        alert(data.msg);
        if (data.status === 'ok') {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
             },
             didClose: () => {
              // Rediriger vers la page de connexion
              navigate('/login');
            }
          });
          Toast.fire({
            icon: "success",
            title: "Enregistrement avec succès"
          });
         
        }


      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });


  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner card">
        <form onSubmit={handleSubmit}>
          <h1>S'enregistrer</h1>
        
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
              S'enregistrer
            </button>
          </div>
          <p className="lienRegister">
            <a href="/Login">Vous avez Déjà un Compte?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
