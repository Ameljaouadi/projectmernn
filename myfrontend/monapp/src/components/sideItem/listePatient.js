import React, { useState, useEffect } from "react";
import { Input, Button, Flex,Tooltip, Space} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import "./liste.css";
import Swal from 'sweetalert2';
import AddPatientCard from "./AddPatientCard";
import UpdatePatientCard from "./updatePatientCard";
const PatientListe = () =>{
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const [patients, setpatients] = useState([]) 
    const [input, setInput] = useState("")
    const [isAddPatientModalVisible, setIsAddPatientModalVisible] = useState(false)    /*partie card ajout */
    const [isUpdatePatientModalVisible, setIsUpdatePatientModalVisible] = useState(false)    /*partie card modifier */
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleSidebarToggle = () => {
      setSidebarExpanded(!isSidebarExpanded);
    };
    const handleAddPatient = (patientData) => {
      // Handle the logic to add a new patient using the provided data
      console.log('Adding new patient:', patientData);
  
  
      // Close the modal after adding the patient
      setIsAddPatientModalVisible(false);
     
        // Fetch the updated patient list zidna hethi l refrech
    fetch("http://localhost:3001/routes/api/patient/patientListe")
    .then((response) => response.json())
    .then((data) => {
      // Update the state with the new patient list
      setpatients(data);
    })
    .catch((error) => console.error('Error fetching patients', error));

    };

   //partie search
   const fetchData = (value) => {
    let apiUrl = 'http://localhost:3001/routes/api/patient/patientListe';
     // If the search value is provided, append it to the API URL
      if (value && value.trim() !== "") {
      apiUrl += `?search=${encodeURIComponent(value)}`;
       }
    
    fetch(apiUrl)

    .then((Response) => Response.json())
    .then((json) => {
        setpatients(json); // Update the state with the fetched data

        })
        
      .catch((error) => console.error('Error fetching patients', error));


};
const handleChange = (value) => {
  setInput(value);
  fetchData(value);
}
   

   
   
   
   
    useEffect(() => {
       fetch("http://localhost:3001/routes/api/patient/patientListe")
       .then(Response => Response.json())
       .then(data => setpatients(data))
       .catch(error => console.error('Error fetching patients', error));

    } , []);

    /* partie supprimer */

    const handleDelete = (patientId) => {
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

      // Make a DELETE request to your server to delete the patient
      fetch(`http://localhost:3001/routes/api/patient/supprimer/${patientId}`, {
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


          // Update the state with the new list of patients after deletion
          setpatients(data);
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
    <div className="maindiv">

<div >

<div>
  <Sidebar onSidebarToggle={handleSidebarToggle} />
</div>


 <div>
 <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
 </div>




</div>
<div className="tablePattient">
      <h1>Liste des patients</h1>

      <div className="partie1">

        <div className='input-wrapper'> 
           <Input placeholder="Chercher..."
           value={input}
           onChange={(e) => handleChange(e.target.value)} />
        </div>
        <div className="btAjouter">
   
           <Flex wrap="wrap" gap="small">
           <Tooltip title="Patient">
               <Button type="primary"  onClick={() => 
                setIsAddPatientModalVisible(true)} > Ajouter  </Button>
            </Tooltip>
           </Flex>
        </div>
       
         
      </div>

      <div className="table-responsive tableP">
      <table>
        <thead>
          <tr className="entete-tab">
        

            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Date de Naissance</th>
            <th>Actions</th>



          </tr>
        </thead>
        <tbody>
            

          {patients.length > 0 ? (
          patients.map(patient => (
            <tr key={patient._id}> 
              
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.telephone}</td>
              <td>{patient.DateNaissance}</td>

              <td className="deuxbutton">
                <Space>
                                              
                    <Button type="link" onClick={() => { 
                      setSelectedPatient(patient);

                      setIsUpdatePatientModalVisible(true);
                    } }
                    icon={<EditOutlined />} 
                    />                 
                  
                 <Button type="link" onClick={() => handleDelete(patient._id)} icon={<DeleteOutlined />} />
                </Space>
              </td>
          
            </tr>
          ))
        ) : (
          <tr className="msgNotData">
            <td colSpan="5">Aucun patient...</td> 
          </tr>
        )}

        </tbody>
      </table>
      </div>
      <AddPatientCard
        visible={isAddPatientModalVisible}
        onClose={() => {
          setIsAddPatientModalVisible(false);
          setSelectedPatient(null);
        }}
        onAddPatient={handleAddPatient} //hethi zeda 
        selectedPatient={selectedPatient}
        
      />
      <UpdatePatientCard 
       visible={isUpdatePatientModalVisible}
       onClose={() =>{
         setIsUpdatePatientModalVisible(false);
         setSelectedPatient(null);
       }}
       onAddPatient={handleAddPatient}
       selectedPatient={selectedPatient}
      />

      


</div>      
    </div>
    )
}

export default PatientListe;

 
  
