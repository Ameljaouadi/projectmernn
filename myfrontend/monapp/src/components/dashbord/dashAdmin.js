import React, { useState,useEffect} from "react";
import { Card,  Statistic } from 'antd';
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Space } from "antd";
import {
  UsergroupAddOutlined,
  ContactsOutlined
} from '@ant-design/icons';

import "./dashbord.css";
function DashAdmin() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [patientCount, setPatientCount] = useState(null);
  const [docteurCount, setDocteurCount] = useState(null);
  const [specialiteCount, setSpecialiteCount] = useState(null);
  



  useEffect(() => {
    // Fetch patient count from your API or backend
    const fetchPatientCount = async () => {
      try {
        const response = await fetch("http://localhost:3001/routes/api/patient/patientCount");
        const data = await response.json();
        setPatientCount(data.patientCount); // Update patientCount state
      } catch (error) {
        console.error("Error fetching patient count:", error);
      }
    };

    fetchPatientCount(); // Call the function when the component mounts
    const fetchDocteurCount = async () => {
      try {
        const response2 = await fetch("http://localhost:3001/routes/api/docteur/docteurCount");
        const data2 = await response2.json();
        setDocteurCount(data2.docteurCount); // Update pdocteurCount state
      } catch (error) {
        console.error("Error fetching docteur count:", error);
      }
    };

    fetchDocteurCount();

    const fetchSpecialiteCount = async () => {
      try {
        const response2 = await fetch("http://localhost:3001/routes/api/specialiteApi/specialiteCount");
        const data2 = await response2.json();
        setSpecialiteCount(data2.specialiteCount); // Update pdocteurCount state
      } catch (error) {
        console.error("Error fetching specialite count:", error);
      }
    }; 

    fetchSpecialiteCount();
  }, []); // Empty dependency array means this effect runs once after the initial render


  
  
  const handleSidebarToggle = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
 

  return (
    <div >

     


      <div>
      <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
      <div>
      <Sidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>


      <div className="lacarde">
   
          <Space direction="horizontal" className="card-container">
 

             <Card>
               <Space direction="horizontal">
               
                 <UsergroupAddOutlined className="icon" />
                
                  <Statistic title={<span className="card-title">Patients</span>} value={patientCount}/>
               </Space>
              </Card>



              <Card>
                  <Space direction="horizontal">
                         <UsergroupAddOutlined className="icon" />
                     <Statistic title={<span className="card-title">Docteurs</span>} value={docteurCount}/>
                  </Space>
              </Card>



              <Card>
                 <Space direction="horizontal">
                     <ContactsOutlined className="icon" />
                     <Statistic title={<span className="card-title">Spécialités</span>} value={specialiteCount}/>
                 </Space>
               </Card>

              
          </Space>

        
        
      </div>
      
      
        
    </div>
    
  );
}

export default DashAdmin;
