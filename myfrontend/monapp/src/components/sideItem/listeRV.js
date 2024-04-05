import React, { useState, useEffect} from "react";
import {  Button, Flex,Tooltip} from 'antd';
import AddEvent from "./AddEvent";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
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


const ListeRV = () => {
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
                <Sidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
                </div>

            </div>



           <div className="days">
            <h1 className="name1">Calendrier</h1>

           
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

export default ListeRV;





/*import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React from "react";
import Modal from 'react-modal';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RV.css";

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

const events = [
    {
        title: "Rdv Mme.BEN JAMEL",
        allDay: false,
        start: new Date(2023, 11, 30, 9, 0 ),
        end: new Date(2023, 11, 30, 10, 0),
    },
    {
        title: "Rdv M.Ayedi",
        //allDay: false,
        start: new Date(2023, 11, 7, 10, 0 ),
        end: new Date(2023, 11, 7, 11, 30),
    },
    {
        title: "Rdv Mme.Bellamine",
        //allDay: false,
        start: new Date(2023, 11, 27, 14, 0),
        end: new Date(2023, 11, 27, 15, 0),
    },
];

const ListeRV = () => {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    const handleSidebarToggle = () => {
        setSidebarExpanded(!isSidebarExpanded);
      };
    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */
/*
             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }
    // Ajout d'un state pour gérer l'ouverture et le contenu de la fenêtre modale
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [notes, setNotes] = useState('');

    // Fonction pour ouvrir la fenêtre modale lors du clic sur un événement
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    // Fonction pour sauvegarder les notes et fermer la fenêtre modale
    const saveNotes = () => {
        // Ici, vous pouvez enregistrer les notes dans votre state ou effectuer d'autres actions nécessaires
        console.log("Notes:", notes);
        setModalIsOpen(false);
    };

    return (

        <div>

<div >

     


<div>
<Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
</div>
<div>
<Sidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
</div>




  
</div>



        <div className="days">
            <h1 className="name1">Calendrier</h1>
            <h2 className="name2">Ajouter un nouveau Rendez-vous</h2>
            <div className="test">
                <input
                 type="text"
                  placeholder="Add Title" 
                  style={{ width: "20%", marginRight: "10px" }}
                   value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
                    />
                <DatePicker
                 placeholderText="Start Date" 
                 style={{ marginRight: "10px" }}
                  showTimeSelect timeIntervals={15} 
                  selected={newEvent.start} 
                  onChange={(start) => 
                  setNewEvent({ ...newEvent, start })} 
                  />
                <DatePicker 
                placeholderText="End Date" 
                showTimeSelect timeIntervals
                 selected={newEvent.end} 
                 onChange={(end) => setNewEvent({ ...newEvent, end })}
                  />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Ajouter RV
                </button>
            </div>
            <Calendar localizer={localizer} className="calenderform" events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleEventClick} />
            {/* Fenêtre modale pour écrire des notes */
           /* <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h2>Écrire des notes pour {selectedEvent?.title}</h2>
                <textarea 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    placeholder="Écrivez vos notes ici..." 
                    style={{ width: "100%", height: "200px" }}
                />
                <button onClick={saveNotes}>Enregistrer</button>
                <button onClick={() => setModalIsOpen(false)}>Fermer</button>
            </Modal>
        </div>
        </div>
    );
};

export default ListeRV;*/







/*import { Calendar, momentLocalizer,Views } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
const localizer = momentLocalizer(moment);
const ListeRV = () => {

    const MOCK_EVENTS = [
        {
        id: 1,
        title: "ev1",
        start: "2023-12-28T18:00:00.000Z",//hetha ya3ti format
        end: "2023-12-28T18:00:00.000Z",
        color: "#C97D60",
        }
    ]

    const events = MOCK_EVENTS.map(event =>{
        return{
            //new date(y,m,m,min)
            title: event.title,
            start: new Date(event.start),//hetha ya3ti format
            end: new Date(event.end),
            color: event.color,

        }}
        )


return (
    <div>
        <Calendar
      localizer={localizer}
      events={events}
      startAccessor={"start"}
      endAccessor={"end"}
      style={{ height: 500 }}
      eventPropGetter={event=>{ //pour ajouter couleur
        return {
        style: {
            backgroundColor: event.color,
        }
       }

      }}

      onSelectEvent={(event)=>alert(event.title)} //ajouter un evenement on cliqyuant sur  evenement parti day
      views={[Views.MONTH,Views.WEEK,Views.DAY]} //affichage 3la jnab month week day
    />

    </div>






);


};
export default ListeRV;*/