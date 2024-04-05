import React, { useState} from "react";

import Navbar from "../navbar/navbar";
import Psidebar from "../sidebar/Psidebar";
import DoctorCard from "../card/doctorCard";


import "./dashbord.css";
function DashPatient() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  
  const handleSidebarToggle = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
 

  return (
    <div >

     


      <div>
      <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
      <div>
      <Psidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>



      
      
        
        
    
      
      
        
    </div>
    
  );
}

export default DashPatient;