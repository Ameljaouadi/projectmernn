import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Psidebar from "../sidebar/Psidebar";
import "./profil.css";
import { useLocation,useNavigate } from "react-router-dom";
import { DatePicker } from 'antd';

const Pprofil = ({userName,userEmail}) => {
    const [editMode, setEditMode] = useState(false);
  
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [password, setPassword] = useState('');
     const [telephone, setTelephone] = useState('');
     const [dataNaissance, setNaissance] = useState('');
  

    const location = useLocation();
    const storedUserName = window.localStorage.getItem("userName");
    const storedEmail = window.localStorage.getItem("userEmail");
    console.log("Stored UserName:", storedUserName);

    console.log("Stored Email:", storedEmail);

  
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
      <Psidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>

    </div>
    <div className="user-profile">
      <h1>Mon Profil </h1>
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
                name="email"   
                value={storedEmail}       />
          </label>
          <label>
            Téléphone :
            <input  
             type="text" 
             className="form-control"
                  placeholder="Entrer Votre Téléphone"
                  onChange={(e) => setTelephone(e.target.value)}                />
          </label>
          <label>
          Date de Naissance:
          <DatePicker className="form-control"
                 placeholder="Sélectionnez la date de naissance"
                   onChange={(date, dateString) => setNaissance(dateString)}
               />
          </label>
         
          <label>
            Nouveau mot de passe :
            <input 
            type="password" 
            className="form-control"
            placeholder="Entrer Votre Mot De Passe"
            onChange={(e) => setPassword(e.target.value)}               />
          </label>

        
           
          
         
          <button onClick={""} className='but1'>Enregistrer</button>
        </div>
           ) : (
        <div>
          
          <p>Nom : {storedUserName}</p>
          <p>Email : {storedEmail}</p>
          <button onClick={() => setEditMode(true) }>Modifier</button>
        </div>
      )}
    </div>
    </div>
  );
};
export default Pprofil;