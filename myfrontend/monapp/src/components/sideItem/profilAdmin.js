import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { useLocation,useNavigate } from "react-router-dom";

import './liste.css'
//import "./design.css";
const ProfilAdmin= ({userName,userEmail}) => {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const storedUserName = window.localStorage.getItem("userName");
    const storedEmail = window.localStorage.getItem("userEmail");
    const Id = window.localStorage.getItem('id');
    console.log('Stored ID:', Id);

    console.log("Stored UserName:", storedUserName);

    console.log("Stored Email:", storedEmail);


    const handleSidebarToggle = () => {
        setSidebarExpanded(!isSidebarExpanded);
      };

    const resetFormFields = () => { //hetha bech yfara8 textfiled
        setEmail('');
        setPassword('');
        setName('');
       
      };

      const handleUpdateAdmin = (e) => {
        e.preventDefault();
    
        console.log( password); 
          
           setLoading(true);
    
           const requestBody = {
            password,
           
          };
    
        fetch(`http://localhost:3001/api/admin/modifier/${Id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((res) =>{
            console.log("Server Response:", res);

            return res.json() })
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

      useEffect(() => {
        setName(storedUserName);
        setEmail(storedEmail);
      }, [storedUserName, storedEmail]);
      



   
    return (

         <div >
             <div>
                   <Sidebar onSidebarToggle={handleSidebarToggle} />
               </div>


              <div>
                       <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
              </div>




              

            <div className='formContainer'>
                <h1>Mon Profil</h1>
        
             <form onLoad={resetFormFields} onSubmit={handleUpdateAdmin}>
             
               
              <div className="mb-3">
                <label>Nom</label>
                <input
                  type="text"
                  defaultValue={storedUserName}
                  className="form-control"
                  placeholder="Entrer Votre Nom"
                 
                />
              </div>
              <div className="mb-3">
                <label>@ Email</label>
                <input
                 value={storedEmail}
                  type="email"
                  className="form-control"
                  placeholder="Entrer Votre Email"
                 
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
             
              
              
                
                 <div className="d-grid">
                   <button type="Modifier" className="btn btn-primary">
                     Modifier
                   </button>
                </div>
    
                  
           
             
            </form>
            </div>
            </div>
      );
    };
export default ProfilAdmin;