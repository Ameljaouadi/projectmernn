
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "./sidebar.css";
import {
  HomeFilled,
  CalendarOutlined,
  UserOutlined,
  FileSearchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';



const Sidebar = () => {
  const [isExpanded, setExpandState] = useState(false);
  const navigate = useNavigate();  // Create a history object

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeFilled />,
      onClick: () => navigate("/dashAdmin"),

    },
    {
      text: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/Profil"),
    },
    {
      text: "Docteurs",
      icon: <FileSearchOutlined />,
      onClick: () => navigate("/listeDocteur"),
    },

    {
      text: "Patients",
      icon: <FileSearchOutlined />,
      onClick: () => navigate("/listePatient"),
    },
    {
      text: "Spécialités",
      icon: <CalendarOutlined />,
      onClick: () => navigate("/Listespecialite"), // Navigate to "/applyDoctor" on click

    },
    

    {
      text: "Rendez-Vous",
      icon: <CalendarOutlined />,
      onClick: () => navigate("/listeRV"), // Navigate to "/applyDoctor" on click

    },
    
    {
      text: "Quitter",
      icon: <LogoutOutlined />,
      onClick: handleLogout,  
    },
  ];

  // Fonction pour basculer l'état de l'expansion
  const toggleExpansion = () => {
    setExpandState(!isExpanded);
  };

  // Fonction pour gérer la déconnexion
  function handleLogout() {
    let timerInterval;
    Swal.fire({
      title: " Attention!",
      html: "Déconnextion dans <b></b> millisecondes.",
      timer: 2000,
      timerProgressBar: true,
     didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
    navigate("/login");
  }
});
     
  }

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <h2>My Doctor</h2>
            </div>
          )}
          <button
            className={
              isExpanded
                ? "hamburger hamburger-in"
                : "hamburger hamburger-out"
            }
            onClick={() => setExpandState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, onClick }, index) => (
            <a
              key={index} // Add a unique key for each menu item
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              href="#"
              onClick={onClick}
            >
              {isExpanded && (
                <>
                  {icon} 
                  <p>{text}</p>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
