import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Toast, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Employes.css';

const Employes = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        matricule: '',
        CIN: '',
        CNS: '',
        nom: '',
        prenom: '',
        adresse: '',
        emploi: '',
        categorie: '',
        echelon: '',
        situationFamiliale: '',
        salaireDeBase: '',
        tauxHoraire: '',
        enfantsACharge: '',
        affiliationCNSS: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/employes');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value,
        });
    };

    const handleAddEmployee = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/employes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });
    
            // Affichez la réponse brute pour le débogage
            const text = await response.text();
            console.log('Response Text:', text);
    
            // Essayez de parser la réponse en JSON
            try {
                const data = JSON.parse(text);
                if (!response.ok) {
                    throw new Error(`Failed to add employee: ${JSON.stringify(data.errors)}`);
                }
                setEmployees([...employees, data]);
                setSuccess(true);
                setError(null);
                setShowForm(false);
                setNewEmployee({
                    matricule: '',
                    CIN: '',
                    CNS: '',
                    nom: '',
                    prenom: '',
                    adresse: '',
                    emploi: '',
                    categorie: '',
                    echelon: '',
                    situationFamiliale: '',
                    salaireDeBase: '',
                    tauxHoraire: '',
                    enfantsACharge: '',
                    affiliationCNSS: '',
                });
            } catch (e) {
                throw new Error('Invalid JSON response');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(`Failed to add employee: ${error.message}`);
            setSuccess(false);
        }
    };
        
    const handleEditEmployee = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/employes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => emp.id === id ? updatedEmployee : emp));
            setSuccess(true);
            setError(null);
            setShowForm(false);
            setEditingEmployee(null);
            setNewEmployee({
                matricule: '',
                CIN: '',
                CNS: '',
                nom: '',
                prenom: '',
                adresse: '',
                emploi: '',
                categorie: '',
                echelon: '',
                situationFamiliale: '',
                salaireDeBase: '',
                tauxHoraire: '',
                enfantsACharge: '',
                affiliationCNSS: '',
            });
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setSuccess(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/employes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            setEmployees(employees.filter(emp => emp.id !== id));
            setSuccess(true);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setSuccess(false);
        }
    };

    const handleEditButtonClick = (employee) => {
        setEditingEmployee(employee.id);
        setNewEmployee({
            matricule: employee.matricule,
            CIN: employee.CIN,
            CNS: employee.CNS,
            nom: employee.nom,
            prenom: employee.prenom,
            adresse: employee.adresse,
            emploi: employee.emploi,
            categorie: employee.categorie,
            echelon: employee.echelon,
            situationFamiliale: employee.situationFamiliale,
            salaireDeBase: employee.salaireDeBase,
            tauxHoraire: employee.tauxHoraire,
            enfantsACharge: employee.enfantsACharge,
            affiliationCNSS: employee.affiliationCNSS,
        });
        setShowForm(true);
    };

    const handleCardClick = (employee) => {
        setSelectedEmployee(employee);
    };

    return (
        <div className="employees-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Operation completed successfully!</Alert>}
            <div className="cards-container">
                <Button className="btn-info" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Annuler' : 'Ajouter un Employé'}
                </Button>
                {employees.map((employee) => (
                    <Card key={employee.id} className="custom-card" onClick={() => handleCardClick(employee)}>
                        <Card.Body>
                            <Card.Title>{employee.nom} {employee.prenom}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{employee.emploi}</Card.Subtitle>
                            <Card.Text>
                                <strong>CIN:</strong> {employee.CIN}<br />
                                <strong>CNS:</strong> {employee.CNS}<br />
                                <strong>Adresse:</strong> {employee.adresse}<br />
                                <strong>Emploi:</strong> {employee.emploi}<br />
                                <strong>Catégorie:</strong> {employee.categorie}<br />
                                <strong>Échelon:</strong> {employee.echelon}<br />
                                <strong>Situation Familiale:</strong> {employee.situationFamiliale}<br />
                                <strong>Salaire de Base:</strong> {employee.salaireDeBase}<br />
                                <strong>Taux Horaire:</strong> {employee.tauxHoraire}<br />
                                <strong>Enfants à Charge:</strong> {employee.enfantsACharge}<br />
                                <strong>Affiliation CNSS:</strong> {employee.affiliationCNSS}
                            </Card.Text>
                            <div className="card-buttons">
                                <Button className="btn-primary" onClick={() => handleEditButtonClick(employee)}>Modifier</Button>
                                <Button className="btn-danger" onClick={() => handleDeleteEmployee(employee.id)}>Supprimer</Button>
                                {/* <Link to={`/fiche_de_paies/create/${selectedEmployee.id}`}>
                                <Button className="btn-secondary">Créer Fiche de Paie</Button>
                            </Link> */}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Toast
                show={showForm}
                onClose={() => setShowForm(false)}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '20%',
                    minWidth: '300px',
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">{editingEmployee ? 'Modifier Employé' : 'Ajouter Nouveau Employé'}</strong>
                </Toast.Header>
                <Toast.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Matricule</Form.Label>
                            <Form.Control
                                type="text"
                                name="matricule"
                                value={newEmployee.matricule}
                                onChange={handleInputChange}
                                placeholder="Entrez matricule"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CIN</Form.Label>
                            <Form.Control
                                type="text"
                                name="CIN"
                                value={newEmployee.CIN}
                                onChange={handleInputChange}
                                placeholder="Entrez CIN"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CNS</Form.Label>
                            <Form.Control
                                type="text"
                                name="CNS"
                                value={newEmployee.CNS}
                                onChange={handleInputChange}
                                placeholder="Entrez CNS"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={newEmployee.nom}
                                onChange={handleInputChange}
                                placeholder="Entrez nom"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={newEmployee.prenom}
                                onChange={handleInputChange}
                                placeholder="Entrez prénom"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={newEmployee.adresse}
                                onChange={handleInputChange}
                                placeholder="Entrez adresse"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Emploi</Form.Label>
                            <Form.Control
                                type="text"
                                name="emploi"
                                value={newEmployee.emploi}
                                onChange={handleInputChange}
                                placeholder="Entrez emploi"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                name="categorie"
                                value={newEmployee.categorie}
                                onChange={handleInputChange}
                                placeholder="Entrez catégorie"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Échelon</Form.Label>
                            <Form.Control
                                type="text"
                                name="echelon"
                                value={newEmployee.echelon}
                                onChange={handleInputChange}
                                placeholder="Entrez échelon"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Situation Familiale</Form.Label>
                            <Form.Control
                                type="text"
                                name="situationFamiliale"
                                value={newEmployee.situationFamiliale}
                                onChange={handleInputChange}
                                placeholder="Entrez situation familiale"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salaire de Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="salaireDeBase"
                                value={newEmployee.salaireDeBase}
                                onChange={handleInputChange}
                                placeholder="Entrez salaire de base"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Taux Horaire</Form.Label>
                            <Form.Control
                                type="number"
                                name="tauxHoraire"
                                value={newEmployee.tauxHoraire}
                                onChange={handleInputChange}
                                placeholder="Entrez taux horaire"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enfants à Charge</Form.Label>
                            <Form.Control
                                type="number"
                                name="enfantsACharge"
                                value={newEmployee.enfantsACharge}
                                onChange={handleInputChange}
                                placeholder="Entrez enfants à charge"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Affiliation CNSS</Form.Label>
                            <Form.Control
                                type="text"
                                name="affiliationCNSS"
                                value={newEmployee.affiliationCNSS}
                                onChange={handleInputChange}
                                placeholder="Entrez affiliation CNSS"
                            />
                        </Form.Group>
                        <Button className="btn-primary" onClick={editingEmployee ? () => handleEditEmployee(editingEmployee) : handleAddEmployee}>
                            {editingEmployee ? 'Modifier' : 'Enregistrer'}
                        </Button>
                    </Form>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default Employes;
