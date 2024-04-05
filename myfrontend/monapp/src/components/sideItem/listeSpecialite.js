import React, { useState,useEffect } from "react";
import { Input, Button,  Space} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import './liste.css'

const Listespecialite = () =>{
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [specialites, setspecialites] = useState([]);
    const handleSidebarToggle = () => {
      setSidebarExpanded(!isSidebarExpanded);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(name);
     
      fetch("http://localhost:3001/routes/api/specialiteApi/ajouterSpecialite",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name ,description }),
        

      })
        .then((res) => res.json())
        .then((data) => {
         if (data.status === 'ok') {
          // Show SweetAlert notification here
          Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Ajout Avec Succès!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Veuillez Verifier!!',
            showConfirmButton: true,
            })
          
        }
        setspecialites([...specialites, data]);
      })
        .catch((error) => {
          console.error('Error during registration:', error);
        });
  
  
    };

    useEffect(() => {
      fetch("http://localhost:3001/routes/api/specialiteApi/specialiteListe")
      .then(Response => Response.json())
      .then(data => setspecialites(data))
      .catch(error => console.error('Error fetching specialites', error));

   } , []);
       
         
   

       /* partie supprimer */

       const handleDelete = (specialiteId) => {
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
              // Si l'utilisateur confirme, effectuez la suppression
              fetch(`http://localhost:3001/routes/api/specialiteApi/supprimer/${specialiteId}`, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === 'ok') {
                    swalWithBootstrapButtons.fire({
                      title: "Deleted!",
                      text: "L'élément sélectionné est supprimé!",
                      icon: "success",
                    });
                  }
                  // Mettre à jour l'état avec la nouvelle liste de spécialités après la suppression
                  setspecialites(data);
                })
                .catch((error) => console.error('Error deleting specialite', error));
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
      
    
    return(
        
        <div  >
               <div>
                   <Sidebar onSidebarToggle={handleSidebarToggle} />
               </div>


              <div>
                       <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
              </div>
       
            <div className="partieTSpes" >

          


                  <div className="table-responsive partieSpecialite2">
                      <table>
                      <thead>
                          <tr className="entete-tab">
        
                             <th>Nom</th>
                             <th>Description</th>

                             <th>Action</th>

           
                          </tr>
                       </thead>
                         <tbody>
            

                           {specialites.length > 0 ? (
                           specialites.map(specialite => (
                          <tr key={specialite._id}> 
              
                             <td>{specialite.name}</td>
                              <td>{specialite.description}</td>

              
                            <td className="deuxbutton">
                              <Space>
                                              
                                 <Button type="link" onClick={() => ""   }
                                  icon={<EditOutlined />} 
                                   />                 
                  
                                   <Button type="link" onClick={() =>
                                     handleDelete(specialite._id)} 
                                    icon={<DeleteOutlined />} />
                               </Space>
                           </td>
          
                          </tr>
            ))
        ) : (
          <tr className="msgNotData">
            <td colSpan="5">Aucune Spécialité...</td> 
          </tr>
        )}

        </tbody>
      </table>

    

        </div>
        <div className="partieSpecialite ">
           <form onSubmit={handleSubmit}>
            <h1>Spécialités</h1>
            
            <div className='mb-3'> 

              <Input 
              className="form-control"
              type="text"
              placeholder="Entrer Specialite"
               onChange={(e) => setName(e.target.value)} 
               />
              </div>
              <div className="mb-3">
                <textarea 
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                />

              </div>
              <div className="d-grid">
              <button type="submit" className="btn btn-primary btSpescialite">
              Ajouter
              </button>
          
              
                 
            </div>
        
           </form>
         </div>
      </div>
    </div>
    )

}
export default Listespecialite;