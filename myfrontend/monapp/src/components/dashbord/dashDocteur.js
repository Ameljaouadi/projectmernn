import React, { useState} from "react";

import Navbar from "../navbar/navbar";
import Dsidebar from "../sidebar/Dsidebar";
import "./dashbord.css";

function DashDocteur() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);



  
  const handleSidebarToggle = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
 

  return (
    <div >

     


      <div>
      <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
      <div>
      <Dsidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>


      
      
        
    </div>
    
  );
}

export default DashDocteur;