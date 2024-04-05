import React from "react"
import{BrowserRouter , Routes , Route, Navigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import DashAdmin from'./components/dashbord/dashAdmin';
import DashPatient from "./components/dashbord/dashPatient";
import DashDocteur from "./components/dashbord/dashDocteur";
import ListeDocteur from './components/sideItem/listeDocteur';
import ListePatient from './components/sideItem/listePatient';
import ProfilAdmin from "./components/sideItem/profilAdmin";
import ListeRV from "./components/sideItem/listeRV";
import Listespecialite from "./components/sideItem/listeSpecialite";
import Psidebar from "./components/sidebar/Psidebar";
import DoctorCard from "./components/card/doctorCard";
import Pprofil from "./components/sideItem/Pprofil";
import Dprofil from "./components/sideItem/Dprofil";
import AddEvent from "./components/sideItem/AddEvent";
import PDListeRV from "./components/sideItem/PDlisteRV";
function App() {
  return (
   <BrowserRouter>

      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />}/> 
        <Route path='/register' element={<Register />}/>

        <Route path='/sidebar' element={<Sidebar />}/>
        <Route path='/navbar' element={<Navbar />}/>
        <Route path="/dashAdmin" element={<DashAdmin />} />
        <Route path="/dashDocteur" element={<DashDocteur />} />
        <Route path="/Pprofil" element={<Pprofil />} />
        <Route path="/Dprofil" element={<Dprofil />} />
        <Route path="/ListeRV" element={<ListeRV />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/PDListeRV" element={<PDListeRV />} />


        <Route path="/dashPatient" element={<DashPatient />} />

        <Route path="/listeDocteur" element={<ListeDocteur />} />
        <Route path="/listePatient" element={<ListePatient />} />
        <Route path="/profil" element={<ProfilAdmin />} />
        
        <Route path="/psidebar" element={<Psidebar />} />
        <Route path="/listeSpecialite" element={<Listespecialite />} />
        <Route path="/doctorCard" element={<DoctorCard />} />

        




      </Routes>
   </BrowserRouter>
  );
}

export default App;
