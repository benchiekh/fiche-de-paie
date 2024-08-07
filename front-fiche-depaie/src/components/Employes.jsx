import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

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

            const text = await response.text(); // Lire la réponse en texte brut
            console.log('Response Text:', text); // Afficher la réponse brute pour débogage

            try {
                const data = JSON.parse(text); // Tenter de parser la réponse en JSON
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

    const handleCreateFicheDePaie = (employee) => {
        navigate('/fiche-de-paie', { state: { employee } });
    };


    return (
        <div className="employees-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Opération réussie !</Alert>}
            
            <Button className="btn-info mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Annuler' : 'Ajouter un Employé'}
            </Button>
            
            <div className="cards-container">
                {employees.map((employee) => (
                    <Card key={employee.id} className="custom-card">
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
                                <Button className="btn-info" onClick={() => handleCreateFicheDePaie(employee)}>Créer Fiche de Paie</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
    
            {showForm && (
                <Form className="mt-3">
                    <Form.Group controlId="formMatricule">
                        <Form.Label>Matricule</Form.Label>
                        <Form.Control
                            type="text"
                            name="matricule"
                            value={newEmployee.matricule}
                            onChange={handleInputChange}
                            placeholder="Entrez le matricule"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCIN">
                        <Form.Label>CIN</Form.Label>
                        <Form.Control
                            type="text"
                            name="CIN"
                            value={newEmployee.CIN}
                            onChange={handleInputChange}
                            placeholder="Entrez le CIN"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCNS">
                        <Form.Label>CNS</Form.Label>
                        <Form.Control
                            type="text"
                            name="CNS"
                            value={newEmployee.CNS}
                            onChange={handleInputChange}
                            placeholder="Entrez le CNS"
                        />
                    </Form.Group>
                    <Form.Group controlId="formNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={newEmployee.nom}
                            onChange={handleInputChange}
                            placeholder="Entrez le nom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom"
                            value={newEmployee.prenom}
                            onChange={handleInputChange}
                            placeholder="Entrez le prénom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formAdresse">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            name="adresse"
                            value={newEmployee.adresse}
                            onChange={handleInputChange}
                            placeholder="Entrez l'adresse"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmploi">
                        <Form.Label>Emploi</Form.Label>
                        <Form.Control
                            type="text"
                            name="emploi"
                            value={newEmployee.emploi}
                            onChange={handleInputChange}
                            placeholder="Entrez l'emploi"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategorie">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control
                            type="text"
                            name="categorie"
                            value={newEmployee.categorie}
                            onChange={handleInputChange}
                            placeholder="Entrez la catégorie"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEchelon">
                        <Form.Label>Échelon</Form.Label>
                        <Form.Control
                            type="text"
                            name="echelon"
                            value={newEmployee.echelon}
                            onChange={handleInputChange}
                            placeholder="Entrez l'échelon"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSituationFamiliale">
                        <Form.Label>Situation Familiale</Form.Label>
                        <Form.Control
                            type="text"
                            name="situationFamiliale"
                            value={newEmployee.situationFamiliale}
                            onChange={handleInputChange}
                            placeholder="Entrez la situation familiale"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalaireDeBase">
                        <Form.Label>Salaire de Base</Form.Label>
                        <Form.Control
                            type="number"
                            name="salaireDeBase"
                            value={newEmployee.salaireDeBase}
                            onChange={handleInputChange}
                            placeholder="Entrez le salaire de base"
                        />
                    </Form.Group>
                    <Form.Group controlId="formTauxHoraire">
                        <Form.Label>Taux Horaire</Form.Label>
                        <Form.Control
                            type="number"
                            name="tauxHoraire"
                            value={newEmployee.tauxHoraire}
                            onChange={handleInputChange}
                            placeholder="Entrez le taux horaire"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEnfantsACharge">
                        <Form.Label>Enfants à Charge</Form.Label>
                        <Form.Control
                            type="number"
                            name="enfantsACharge"
                            value={newEmployee.enfantsACharge}
                            onChange={handleInputChange}
                            placeholder="Entrez le nombre d'enfants à charge"
                        />
                    </Form.Group>
                    <Form.Group controlId="formAffiliationCNSS">
                        <Form.Label>Affiliation CNSS</Form.Label>
                        <Form.Control
                            type="text"
                            name="affiliationCNSS"
                            value={newEmployee.affiliationCNSS}
                            onChange={handleInputChange}
                            placeholder="Entrez l'affiliation CNSS"
                        />
                    </Form.Group>
                    <Button className="btn-primary mt-3" onClick={editingEmployee ? () => handleEditEmployee(editingEmployee) : handleAddEmployee}>
                        {editingEmployee ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Form>
            )}
        </div>
    );
    };

export default Employes;
