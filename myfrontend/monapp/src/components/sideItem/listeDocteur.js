import React, { useState, useEffect } from "react";
import { Input, Button, Flex,Tooltip, Space} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import './liste.css';
import Swal from 'sweetalert2';

import AddDoctorCard from "./AddDoctorCard";
import UpdateDoctorCard from "./UpdateDoctorCard";
const DocteurListe = () =>{
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const [docteurs, setDocteurs] = useState([]) 
    const [input, setInput] = useState("")
    const [isAddDoctorModalVisible, setIsAddDoctorModalVisible] = useState(false)    /*partie card ajout */
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isUpdateDoctorModalVisible, setIsUpdateDoctorModalVisible] = useState(false)    /*partie card modifier */

    const handleSidebarToggle = () => {
      setSidebarExpanded(!isSidebarExpanded);
    };
    const handleAddDoctor = (doctorData) => {
      // Handle the logic to add a new doctor using the provided data
      console.log('Adding new doctor:', doctorData);
  
  
      // Close the modal after adding the doctor
      setIsAddDoctorModalVisible(false);

         // Fetch the updated patient list zidna hethi l refrech
    fetch("http://localhost:3001/routes/api/docteur/docteurListe")
    .then((response) => response.json())
    .then((data) => {
      // Update the state with the new docteur list
      setDocteurs(data);
    })
    .catch((error) => console.error('Error fetching docteurs', error));

    };

    //partie search
   const fetchData = (value) => {
    let apiUrl = 'http://localhost:3001/routes/api/docteur/docteurListe';
     // If the search value is provided, append it to the API URL
      if (value && value.trim() !== "") {
      apiUrl += `?search=${encodeURIComponent(value)}`;
       }
    
    fetch(apiUrl)

    .then((Response) => Response.json())
    .then((json) => {
        setDocteurs(json); // Update the state with the fetched data

        })
        
      .catch((error) => console.error('Error fetching doctors', error));


};
const handleChange = (value) => {
  setInput(value);
  fetchData(value);
}
    
    useEffect(() => {
       fetch("http://localhost:3001/routes/api/docteur/docteurListe")
       .then(Response => Response.json())
       .then(data => setDocteurs(data))
       .catch(error => console.error('Error fetching doctors', error));

    } , [])

    /* partie supprimer */

    const handleDelete = (doctorId) => {
       
         // Afficher une boîte de dialogue de confirmation avec SweetAlert
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
      .fire({
        title: "Voulez vous vraiment supprimer?",
        text: "Vous etes sur?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

      

      // Make a DELETE request to your server to delete the doctor
      fetch(`http://localhost:3001/routes/api/docteur/supprimer/${doctorId}`, {
        method: "DELETE",
      })
        .then((response) => 
          response.json())
        .then((data) => {
          if (data.status === 'ok') {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "L'élément sélectionné est supprimé!",
              icon: "success",
            });
          }
          // Update the state with the new list of doctors after deletion
          setDocteurs(data);
        })
        .catch((error) => console.error('Error deleting patient', error));
       
      } else if (
        // Gérer le cas où l'utilisateur annule la suppression
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Anuuler!",
          text: "Suppression ignorée :)",
          icon: "error",
        });
      }
    });
  


  };



    return (
      
      
      <div >
         

           <div>
             <Sidebar onSidebarToggle={handleSidebarToggle} />
           </div>


            <div>
            <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
            </div>



  
      
        
        <div className="tableDoc">
      <h1>Liste des docteurs</h1>

      <div className="partie1">
        <div className='input-wrapper'> 
           <Input placeholder="Chercher..."
           value={input}
           onChange={(e) => handleChange(e.target.value)} />
        </div>
        <div className="btAjouter">
   
           <Flex wrap="wrap" gap="small">
              <Tooltip title="Doctor">
              <Button type="primary"  onClick={() => 
                setIsAddDoctorModalVisible(true)} > Ajouter  </Button>
               </Tooltip>
            </Flex>
        </div>
      </div>
      <div className={`table-responsive ${isSidebarExpanded ? 'table-expanded' : ''}`}>
         <table>
        <thead>
          <tr className="entete-tab">
           
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Spécialité</th>
            <th>Prix Visite</th>
            <th>Adresse</th>
            <th>Actions</th>


          </tr>
        </thead>
        <tbody>

          { docteurs.length > 0 ? (
          docteurs.map(doc => (
            <tr key={doc._id}>
                      
              
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.telephone}</td>
              <td>{doc.specialite}</td>
              <td>{doc.prixVisite}</td>
              <td>{doc.adresse}</td>
              <td className="deuxbutton">
                <Space>
                                              
                    <Button type="link" onClick={() => { 
                      setSelectedDoctor(doc);

                      setIsUpdateDoctorModalVisible(true);
                    } }
                    icon={<EditOutlined />} 
                    />                 
                   
                 <Button type="link" onClick={() => handleDelete(doc._id)} icon={<DeleteOutlined />} />
                </Space>
              </td>


            </tr>
          ))
          ) : (
            <tr className="msgNotData">
            <td colSpan="9">Aucun Docteur...</td> 
         
          </tr>
          )}
        </tbody>
         </table>
      </div>
      <AddDoctorCard
        visible={isAddDoctorModalVisible}
        onClose={() => {
          setIsAddDoctorModalVisible(false);
          setSelectedDoctor(null);
        }}
        onAddDoctor={handleAddDoctor}
        selectedDoctor={selectedDoctor}

      />
      <UpdateDoctorCard
       visible={isUpdateDoctorModalVisible}
       onClose={() =>{
         setIsUpdateDoctorModalVisible(false);
         setSelectedDoctor(null);
       }}
       onAddDoctor={handleAddDoctor}
       selectedDoctor={selectedDoctor}
      />
    </div>
    </div>
    

    
    )
}

export default DocteurListe;

 
  
