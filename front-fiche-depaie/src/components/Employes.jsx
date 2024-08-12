import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Employes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [searchMatricule, setSearchMatricule] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

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
            setFilteredEmployees(data);
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

    const handleSearchMatriculeChange = (e) => {
        setSearchMatricule(e.target.value);
    };

    const handleSearch = () => {
        const results = employees.filter(emp => String(emp.matricule).includes(searchMatricule));
        setFilteredEmployees(results);
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
    
            // Vérifiez le Content-Type de la réponse
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
    
            if (!response.ok) {
                throw new Error('Échec de l\'ajout de l\'employé');
            }
    
            if (!isJson) {
                // Si la réponse n'est pas au format JSON
                const text = await response.text();
                console.error('Réponse brute non JSON:', text);
                throw new Error('La réponse n\'était pas au format JSON');
            }
    
            // Traitement de la réponse JSON
            const data = await response.json();
            console.log('Réponse de l\'API:', data);
    
            // Ajoutez l'employé à la liste
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
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'employé:', error.message);
            setError(`Erreur lors de l'ajout de l'employé : ${error.message}`);
            setSuccess(false);
        }
    };
        
    const handleEditEmployee = async (id) => {
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/employes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            const updatedEmployee = await response.json();
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const updatedEmployees = employees.map(emp => emp.id === id ? updatedEmployee : emp);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
            setSuccess(true);
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
            toast.success('Employé modifié avec succès !');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            toast.error('Erreur lors de la modification de l\'employé : ' + error.message);
        }
    };

    const handleDeleteEmployee = async (id) => {
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/employes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            const updatedEmployees = employees.filter(emp => emp.id !== id);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
            setSuccess(true);
            toast.success('Employé supprimé avec succès !');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            toast.error('Erreur lors de la suppression de l\'employé : ' + error.message);
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

    const handleCreateFicheDePaie = (employee) => {
        navigate('/fiche-de-paie', { state: { employee } });
    };

    return (
        <div className="employees-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Opération réussie !</Alert>}

            <div className="d-flex mb-3">
                <Button className="btn-info me-3" onClick={() => setShowForm(true)}>
                    Ajouter un Employé
                </Button>

                <Form.Control
                    type="text"
                    placeholder="Rechercher par matricule"
                    value={searchMatricule}
                    onChange={handleSearchMatriculeChange}
                    className="me-3"
                />
                <Button className="btn-primary" onClick={handleSearch}>Rechercher</Button>
            </div>

            <div className="cards-container">
                {filteredEmployees.map((employee) => (
                    <Card key={employee.id} className="custom-card">
                        <Card.Body>
                            <Card.Title>{employee.nom} {employee.prenom}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{employee.emploi}</Card.Subtitle>
                            <Card.Text>
                                <strong>Matricule:</strong> {employee.matricule}<br />
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
                                <Button className="btn-success" onClick={() => handleCreateFicheDePaie(employee)}>Fiche de Paie</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <ToastContainer />

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingEmployee ? 'Modifier' : 'Ajouter'} un Employé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formMatricule">
                            <Form.Label>Matricule</Form.Label>
                            <Form.Control
                                type="text"
                                name="matricule"
                                value={newEmployee.matricule}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCIN">
                            <Form.Label>CIN</Form.Label>
                            <Form.Control
                                type="text"
                                name="CIN"
                                value={newEmployee.CIN}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCNS">
                            <Form.Label>CNS</Form.Label>
                            <Form.Control
                                type="text"
                                name="CNS"
                                value={newEmployee.CNS}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={newEmployee.nom}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={newEmployee.prenom}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdresse">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={newEmployee.adresse}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmploi">
                            <Form.Label>Emploi</Form.Label>
                            <Form.Control
                                type="text"
                                name="emploi"
                                value={newEmployee.emploi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategorie">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                name="categorie"
                                value={newEmployee.categorie}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEchelon">
                            <Form.Label>Échelon</Form.Label>
                            <Form.Control
                                type="text"
                                name="echelon"
                                value={newEmployee.echelon}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSituationFamiliale">
                            <Form.Label>Situation Familiale</Form.Label>
                            <Form.Control
                                type="text"
                                name="situationFamiliale"
                                value={newEmployee.situationFamiliale}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSalaireDeBase">
                            <Form.Label>Salaire de Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="salaireDeBase"
                                value={newEmployee.salaireDeBase}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTauxHoraire">
                            <Form.Label>Taux Horaire</Form.Label>
                            <Form.Control
                                type="number"
                                name="tauxHoraire"
                                value={newEmployee.tauxHoraire}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEnfantsACharge">
                            <Form.Label>Enfants à Charge</Form.Label>
                            <Form.Control
                                type="number"
                                name="enfantsACharge"
                                value={newEmployee.enfantsACharge}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAffiliationCNSS">
                            <Form.Label>Affiliation CNSS</Form.Label>
                            <Form.Control
                                type="text"
                                name="affiliationCNSS"
                                value={newEmployee.affiliationCNSS}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={() => editingEmployee ? handleEditEmployee(editingEmployee) : handleAddEmployee()}>
                        {editingEmployee ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employes;
