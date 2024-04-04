/*import {Form, Input} from 'antd';*/
import React, { useState } from 'react'
/*import { Link } from 'react-router-dom';*/
import './style2.css';



export default function Login() {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");
const [role, setRole] = useState("");




const handleSubmit = (e) => {

e.preventDefault();

// Validation for empty fields
if (!email || !password || !role) {
    alert("Veuillez remplir tout les champs!");
    return;
  }

  // Convert the role to lowercase
  const lowercaseRole = role.toLowerCase();
  console.log("Role sent to backend:", lowercaseRole); // Add this line for debugging


fetch("http://localhost:3001/routes/api/login/login-user", {

method: "POST",

crossDomain: true,

headers: {
    "Content-Type": "application/json",
Accept: "application/json",
"Access-Control-Allow-Origin": "*",
},
body: JSON.stringify({
email,
password,
role: lowercaseRole, // Send the lowercase role

}),
})

.then((res) => res.json())
.then((data) => {
console.log(data, "userRegister");
if (data.status === "usernotok" || data.status === "passnotok") {
alert(data.msg);

}else if (data.status === "ok") {


      // Stocker les informations de l'utilisateur dans le local storage
      window.localStorage.setItem("id", data.id);
      window.localStorage.setItem("userName", data.name);
      window.localStorage.setItem("userName", data.role === "admin" ? "Admin" : data.name);
      window.localStorage.setItem("userEmail", data.email); 
      window.localStorage.setItem("userRole", lowercaseRole);
console.log(data.userId)
//redicrection basé sur les roles
switch (lowercaseRole) {
    case "admin":
      window.location.href = "./dashAdmin";
      break;
    case "docteur":
      window.location.href = "./DashDocteur";
      break;
    case "patient":
      window.location.href = "./dashPatient";
      break;
    default:
      alert("Invalid role");
  }

}

})

.catch((err) => 
    console.error("Error during login:",err));


// Ajoutez cette console pour vous assurer que le nom d'utilisateur est correctement stocké
console.log("User name stored in localStorage:", window.localStorage.getItem("userName"));   

};



    return (

        <div className="auth-wrapper">

            <div className="auth-inner card">

                <form onSubmit={handleSubmit}>

                    <h1>Se Connecter</h1>

                    <div className='form-group'>
                      <div className="text-center">
                        <label>Statut:</label>

                        <div className="form-check form-check-inline">

                            <input type="radio"name="role"value="admin" onChange={(e) => setRole(e.target.value)}/>
                            <label className="form-check-label">Admin</label>

                        </div>

                        <div className="form-check form-check-inline">

                          <input type="radio" name="role" value="patient"onChange={(e) => setRole(e.target.value)}/>
                            <label className="form-check-label">Patient</label>
                        </div>

                        <div className="form-check form-check-inline">

                          <input type="radio"name="role"value="docteur" onChange={(e) => setRole(e.target.value)}/>
                          <label className="form-check-label">Docteur</label>

                        </div>
                      
                    </div>
                    </div>
    
                    

                    <div className="mb-3">

                        <label> @ Email </label>

                        <input type="email" className="form-control" placeholder="Entrer Votre Nom" onChange={(e) => setEmail(e.target.value)}/>

                    </div>

                    <div className="mb-3">

                        <label>Mot De Passe</label>

                        <input type="password" className="form-control" placeholder="Entrer Votre Mot de Passe" onChange={(e) => setPassword(e.target.value)}/>

                    </div>

                    <div className="mb-3">

                        <div className="custom-control custom-checkbox">

                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>

                            <label className="custom-control-label" htmlFor="customCheck1"> Remember me</label>

                        </div>

                    </div>

                    <div className="d-grid">

                        <button type="submit" className="btn btn-primary"> Se Connecter</button>

                    </div>

                    <p className="lienRegister"><a href="/Register" >Vous Ne Déposez pas de Compte?</a></p>

                </form>

            </div>


        </div>

    );

}