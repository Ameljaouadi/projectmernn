import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Dsidebar from "../sidebar/Dsidebar";
import "./profil.css";
import { useLocation,useNavigate } from "react-router-dom";

const Dprofil = () => {
    const [editMode, setEditMode] = useState(false);
  
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const location = useLocation();
    const storedUserName = window.localStorage.getItem("userName");
    const storedEmail = window.localStorage.getItem("userEmail");
    const [password, setPassword] = useState('');
     const [telephone, setTelephone] = useState('');
      
      const [prixVisite, setPrixVisite] = useState('');
     const [adresse, setAdresse] = useState('');
    
    
    
    console.log("Stored UserName:", storedUserName);

    console.log("Stored Email:", storedEmail);

  
    useEffect(() => {
      // Fetch user's profile data from the server when the component mounts
      fetchUserProfile();
    }, []);
  
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile data from the server using an API endpoint
        const response = await fetch('http://your-api-endpoint-for-user-profile-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
  
        // Set the user profile data in the component state
        setTelephone(userData.telephone);
        setPrixVisite(userData.prixVisite);
        setAdresse(userData.adresse);
        setPassword(userData.password);
  
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

  
    const handleSidebarToggle = () => {
      setSidebarExpanded(!isSidebarExpanded);
    };

return (
 <div>
    <div>
        
      <div>
      <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
      <div>
      <Dsidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>

    </div>
    <div className="user-profile">
      <h1>Profil de l'utilisateur</h1>
      {editMode ? (
        <div>
          
          
          <label>
            Nom :
            <input      
            type="text"  
             name="name"   
             defaultValue={storedUserName}        />
          </label>
          <label>
            Email : 
            <input   
              type="email"            
              className="form-control"   
              value={storedEmail}      
               />
          </label>
          <label>
            Téléphone :
            <input
            type="text"
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setTelephone(e.target.value)}                 />
          </label>
         
          <label>
            Nouveau mot de passe :
            <input
              type="password"
              className="form-control"
              placeholder="Entrer Votre Mot De Passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
          Prix Visite :
          <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setPrixVisite(e.target.value)}
                />
                
          </label>
          
          <label>
             Adresse :
             <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setAdresse(e.target.value)}
                />
          </label>
         
          <button onClick={""} className='but1'>Enregistrer</button>
        </div>
           ) : (
        <div>
          
          <p>Nom : {storedUserName}</p>
          <p>Email :{storedEmail}</p>
          <button onClick={() => setEditMode(true) }>Modifier</button>
        </div>
      )}
    </div>
    </div>
  );
};
export default Dprofil;