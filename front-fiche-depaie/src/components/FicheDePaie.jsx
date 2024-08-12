import React, { useState, useEffect } from 'react';
import { Card, Button, Collapse, Form, Alert, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Pour générer des tables dans le PDF

import SalaireBrutForm from './SalaireBrutForm'; // Vérifiez le chemin du fichier
import CotisationForm from './CotisationForm';
import NetForm from './NetForm';

const FicheDePaie = () => {
    const location = useLocation();
    const [employee, setEmployee] = useState(null);
    const [showSalaryDetails, setShowSalaryDetails] = useState(false);
    const [showSalaireBrutForm, setShowSalaireBrutForm] = useState(false);
    const [showCotisationForm, setShowCotisationForm] = useState(false);
    const [showNetForm, setShowNetForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [ficheDePaie, setFicheDePaie] = useState([]);
    const [selectedFiche, setSelectedFiche] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const employeeData = location.state?.employee;
        setEmployee(employeeData);
        if (employeeData) {
            fetchFicheDePaie(employeeData.id);
        }
    }, [location.state]);

    const fetchFicheDePaie = async (employeeId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/fiche_de_paies`);
            if (response.ok) {
                const data = await response.json();
                const filteredData = data.filter(fiche => fiche.employe_id === employeeId);
                setFicheDePaie(filteredData);
            } else {
                const errorText = await response.text();
                console.error('Erreur API:', errorText);
                setError('Erreur lors de la récupération des fiches de paie.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la récupération des fiches de paie.');
        }
    };

    const handleToggleSalaryDetails = () => {
        setShowSalaryDetails(!showSalaryDetails);
    };

    const handleToggleSalaireBrutForm = () => {
        setShowSalaireBrutForm(!showSalaireBrutForm);
    };

    const handleToggleCotisationForm = () => {
        setShowCotisationForm(!showCotisationForm);
    };

    const handleToggleNetForm = () => {
        setShowNetForm(!showNetForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFicheDePaie(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/fiche_de_paies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employe_id: employee.id,
                    mois: ficheDePaie.mois,
                    annee: ficheDePaie.annee,
                    salaireBrut: ficheDePaie.salaireBrut,
                    cotisations: ficheDePaie.cotisations,
                    netAPayer: ficheDePaie.netAPayer,
                    commentaires: ficheDePaie.commentaires,
                }),
            });
    
            if (response.ok) {
                // Réinitialiser les champs du formulaire après succès
                setFicheDePaie({
                    mois: '',
                    annee: '',
                    salaireBrut: '',
                    cotisations: '',
                    netAPayer: '',
                    commentaires: '',
                });
                
                // Rafraîchir les fiches de paie
                fetchFicheDePaie(employee.id);
    
                setSuccess(true);
                setError(null);
            } else {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout de la fiche de paie: ${errorDetails.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
            setSuccess(false);
        }
    };

    const handleDownloadPDF = async (fiche) => {
        // Votre code pour télécharger le PDF va ici
    };

    const handleAddCotisation = (fiche) => {
        setSelectedFiche(fiche);
        setShowCotisationForm(true);
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fiche-de-paie-container">
            <Card className="employee-info-card">
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
                    <Button variant="info" onClick={handleToggleSalaryDetails}>
                        {showSalaryDetails ? 'Masquer fiche de paie' : 'Afficher fiche de paie'}
                    </Button>
                    <Button variant="primary" className="mt-2" onClick={() => setShowModal(true)}>
                        Créer Fiche de Paie
                    </Button>
                </Card.Body>
            </Card>

            <Collapse in={showSalaryDetails}>
                <div className="salary-details mt-3">
                    {ficheDePaie.length > 0 ? (
                        ficheDePaie.map((fiche, index) => (
                            <Card className="mt-2" key={index}>
                                <Card.Body>
                                    <Card.Title>Fiche de Paie {index + 1}</Card.Title>
                                    <Card.Text>
                                        <strong>Mois:</strong> {fiche.mois || 'N/A'}<br />
                                        <strong>Année:</strong> {fiche.annee || 'N/A'}<br />
                                        <strong>Salaire Brut:</strong> {fiche.salaireBrut || 'N/A'}<br />
                                        <strong>Cotisations:</strong> {fiche.cotisations || 'N/A'}<br />
                                        <strong>Net à Payer:</strong> {fiche.netAPayer || 'N/A'}<br />
                                    </Card.Text>
                                    <Button variant="success" className="mt-2" onClick={() => handleDownloadPDF(fiche)}>
                                        Télécharger PDF
                                    </Button>
                                    <Button variant="warning" className="mt-2" onClick={() => handleAddCotisation(fiche)}>
                                        Ajouter Cotisation
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div>Aucune fiche de paie disponible.</div>
                    )}
                </div>
            </Collapse>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer Fiche de Paie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Mois</Form.Label>
                            <Form.Control
                                type="text"
                                name="mois"
                                value={ficheDePaie.mois || ''}
                                onChange={handleInputChange}
                                placeholder="Entrez le mois"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Année</Form.Label>
                            <Form.Control
                                type="text"
                                name="annee"
                                value={ficheDePaie.annee || ''}
                                onChange={handleInputChange}
                                placeholder="Entrez l'année"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salaire Brut</Form.Label>
                            <Form.Control
                                type="number"
                                name="salaireBrut"
                                value={ficheDePaie.salaireBrut || ''}
                                onChange={handleInputChange}
                                placeholder="Entrez le salaire brut"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cotisations</Form.Label>
                            <Form.Control
                                type="text"
                                name="cotisations"
                                value={ficheDePaie.cotisations || ''}
                                onChange={handleInputChange}
                                placeholder="Entrez les cotisations"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Net à Payer</Form.Label>
                            <Form.Control
                                type="number"
                                name="netAPayer"
                                value={ficheDePaie.netAPayer || ''}
                                onChange={handleInputChange}
                                placeholder="Entrez le net à payer"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Commentaires</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="commentaires"
                                value={ficheDePaie.commentaires || ''}
                                onChange={handleInputChange}
                                placeholder="Ajoutez des commentaires"
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Fiche de paie créée avec succès !</Alert>}
                        <Button variant="primary" type="submit">Enregistrer</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showCotisationForm} onHide={() => setShowCotisationForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter Cotisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CotisationForm ficheDePaie={selectedFiche} />
                </Modal.Body>
            </Modal>

            <Modal show={showSalaireBrutForm} onHide={() => setShowSalaireBrutForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Salaire Brut</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SalaireBrutForm ficheDePaie={selectedFiche} />
                </Modal.Body>
            </Modal>

            <Modal show={showNetForm} onHide={() => setShowNetForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Net à Payer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NetForm ficheDePaie={selectedFiche} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FicheDePaie;
