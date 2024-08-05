import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import CustomNavbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Employes from './components/Employes';
// import Payslip from './components/Payslip';
// import SalaryComponent from './components/SalaryComponent';
// import PayrollRule from './components/PayrollRule';
 function App() {
    return (
        <Router>
              <CustomNavbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Employes" element={<Employes />} />
                


                
            </Routes>
        </Router>
    );
}

export default App;

