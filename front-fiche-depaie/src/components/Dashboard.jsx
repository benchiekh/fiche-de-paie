import React from 'react';
 import Employes from './Employes';
 

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard - system Fiche de paie</h1>

            <div className="grid">
                <div className="card">
                <h3>Employee Details</h3>
                <Employes />
                  
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
