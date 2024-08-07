import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import CustomNavbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Employes from './components/Employes';
import FicheDePaie from './components/FicheDePaie';
import SalaireBrutForm from './components/SalaireBrutForm';
import CotisationForm from './components/CotisationForm';
import NetForm from './components/NetForm';

import 'bootstrap/dist/css/bootstrap.min.css';


 function App() {
    return (
        <Router>
              <CustomNavbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Employes" element={<Employes />} />
                <Route path="/fiche-de-paie" element={<FicheDePaie />} />
                <Route path="/salaire-brut" component={<SalaireBrutForm />} />
                <Route path="/cotisations" component={<CotisationForm />} />
                <Route path="/net" component={<NetForm />} />


                
            </Routes>
        </Router>
    );
}

export default App;

