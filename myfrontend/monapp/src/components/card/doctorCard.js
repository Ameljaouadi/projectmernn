import React, { useState, useEffect } from 'react';
import { Card, Space  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './card.css';
import Navbar from "../navbar/navbar";
import Psidebar from "../sidebar/Psidebar";

const DoctorCard = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
 
  
  const handleSidebarToggle = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch('http://localhost:3001/routes/api/docteur/docteurListe'); // Remplacez par le bon endpoint de votre backend
        const data = await response.json();
        setDoctorData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du docteur', error);
      }
    };

    fetchDoctorData();
  }, []);

  return (

    <div>

      
<div>
      <Navbar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
      <div>
      <Psidebar isSidebarExpanded={isSidebarExpanded} onSidebarToggle={handleSidebarToggle} />
      </div>
    <div className='lacarde'>
    <>
    {doctorData.length > 0 ? (
      doctorData.map((doctor) => (
        <Card key={doctor._id} className='mycard'>
          <Space direction="horizontal" className="card-container">
            <UserOutlined className="icon2" />
            <div className='doc'>
              <h2 className='nomDoc'>{doctor.name}</h2>
              <p>Email: {doctor.email}</p>
              <p>Téléphone: {doctor.telephone}</p>
              <p>Spécialité: {doctor.specialite}</p>
              <p>Prix de la visite: {doctor.prixVisite}</p>
              <p>Adresse: {doctor.adresse}</p>
            </div>
          </Space>
        </Card>
      ))
    ) : (
      <p>Chargement des données des docteurs...</p>
    )}
  </>
  </div>
  </div>
);
};

export default DoctorCard;
