import React, { useState, useEffect} from "react";
import {  Button, Flex,Tooltip} from 'antd';
import AddEvent from "./AddEvent";
import Navbar from "../navbar/navbar";
import Psidebar from "../sidebar/Psidebar";
import Dsidebar from "../sidebar/Dsidebar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Modal } from 'antd';


import "react-datepicker/dist/react-datepicker.css";
import "./RV.css";
import DatePicker from "react-datepicker";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
    "fr": require("date-fns/locale/fr"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const PDListeRV = () => {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false)    /*partie card ajout */
     
     // Ajout d'un state pour gérer l'ouverture et le contenu de la fenêtre modale
     const [modalIsOpen, setModalIsOpen] = useState(false);
     const [selectedEvent, setSelectedEvent] = useState(null);
     const [notes, setNotes] = useState('');
    const [newEvent, setNewEvent] = useState({  start: new Date(), end:new Date() });
    const [allEvents, setAllEvents] = useState([]);
    // Ajoutez un nouvel état pour suivre l'événement en cours de suppression
         const [eventToDelete, setEventToDelete] = useState(null);


         const [userRole, setUserRole] = useState("");

    const fetchEventsFromServer = async () => {
            try {
                const response = await fetch('http://localhost:3001/routes/api/event/getAllEvents');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched Events:", data);
                 // Mise à jour du rôle de l'utilisateur
                      setUserRole(data.role);

                // Convert date strings to Date objects
                    const eventsWithDateObjects = data.map(event => ({
                        ...event,
                        Date_deb: new Date(event.Date_deb),
                        Date_fin: new Date(event.Date_fin),
        }));

                setAllEvents(eventsWithDateObjects);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };


        useEffect(() => {
             // Fetch events from the server when the component mounts
        fetchEventsFromServer();
        },  []); // Empty dependency array means this effect runs once after the initial render


        useEffect(() => {
            // Log the events to the console for debugging
            console.log("All Events:", allEvents);
        }, [allEvents]);
        // fonction qui est appelée lorsqu'un événement du calendrier est cliqué
        const handleEventClick = (event) => {
           
          setSelectedEvent(event);
          setModalIsOpen(true);
        };
   

    const saveNotes = () => {
        console.log("Notes:", notes);
        setModalIsOpen(false);
    };

    const handleSidebarToggle = () => {
        setSidebarExpanded(!isSidebarExpanded);
    };
    const handleDeleteEvent = (event) => {
        // Affichez une fenêtre modale de confirmation avant de supprimer l'événement
        Modal.confirm({
          title: "Confirmer la suppression",
          content: "Voulez-vous vraiment supprimer cet événement ?",
          onOk: () => {
            // Appel à la fonction de suppression
            deleteEvent(event);
          },
          onCancel: () => {
            // Annule la suppression
            setEventToDelete(null);
          },
        });
    
        // Stockez l'événement actuel en attente de confirmation
        setEventToDelete(event);
      };
    
      const deleteEvent = (event) => {
        // Effectuez la demande de suppression côté serveur
        fetch(`http://localhost:3001/routes/api/event/deleteEvent/${event._id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Delete Event Response:", data);
            // Rafraîchissez les événements après la suppression
            fetchEventsFromServer();
          })
          .catch((error) => {
            console.error("Error deleting event", error);
          })
          .finally(() => {
            // Réinitialisez l'état après la suppression
            setEventToDelete(null);
          });
      };
    
      // Custom EventComponent to display doctor and patient names
const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <br />
      <small>
        Docteur: {event.docteur} | Patient: {event.patient}
      </small>
      <br />
    {/* Ajoutez le bouton de suppression ici */}
    <Button type="link" danger onClick={() => handleDeleteEvent(event)}>
      Supprimer
    </Button>

    </div>
  );





    return (

    <div>

            <div >

     
                <div>
                <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
                </div>
                <div>
                    {userRole === "docteur" ? (
                    <Dsidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
                    ) : (
                    <Psidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
                    )}
                     </div>

            </div>



           <div className="days">
            <h1 className="name1">Calendrier</h1>

            {userRole === "admin" && (
            <div className="partieAjout">
            <h2 className="name2">Ajouter un nouveau Rendez-vous</h2>
            <Flex wrap="wrap" gap="small">
             <Tooltip title="Rendez-Vous">
               <Button type="primary"  onClick={() => 
                setIsAddEventModalVisible(true)} >
                    {" "}
                     Ajouter {" "}
                      </Button>
                      
            </Tooltip>
           </Flex>
           
            </div>
             )}
            <Calendar 
            localizer={localizer}
             className="calenderform"
              events={allEvents}
               startAccessor={"Date_deb"}
                endAccessor={"Date_fin"} 
                style={{ height: 500, margin: "50px" }}
                 onSelectEvent={handleEventClick} 
                 eventPropGetter={ event=> ({
                     //pour ajouter couleur
                    style: { backgroundColor: event.color },
                    })}
                    
                    components={{
                        event: EventComponent, // Custom component for rendering events
                    }}
                 
                    
                    
                    />
                     
                    
          
        
            <AddEvent
        visible={isAddEventModalVisible}
        onClose={() => {
          setIsAddEventModalVisible(false);
          // Refresh events after adding a new event
          fetchEventsFromServer();
          
        }}
       
        
        
      />
        </div>
        </div>
    );
};

export default PDListeRV;