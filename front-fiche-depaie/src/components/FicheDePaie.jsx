import React, { useState, useEffect } from 'react';
import { Card, Button, Collapse, Form, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SalaireBrutForm from './SalaireBrutForm';
import CotisationsForm from './CotisationForm';
import NetForm from './NetForm';



const FicheDePaie = () => {
    const location = useLocation();
    const [employee, setEmployee] = useState(null);
    const [showSalaryDetails, setShowSalaryDetails] = useState(false);
    const [showSalaireBrutForm, setShowSalaireBrutForm] = useState(false);
    const [showCotisationsForm, setShowCotisationsForm] = useState(false);
    const [showNetForm, setShowNetForm] = useState(false);
    const [ficheDePaie, setFicheDePaie] = useState({
        mois: '',
        annee: '',
        salaireBrut: '',
        cotisations: '',
        netAPayer: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const employeeData = location.state?.employee;
        setEmployee(employeeData);
    }, [location.state]);

    const handleToggleSalaryDetails = () => {
        setShowSalaryDetails(!showSalaryDetails);
    };

    const handleToggleSalaireBrutForm = () => {
        setShowSalaireBrutForm(!showSalaireBrutForm);
    };

    const handleToggleCotisationsForm = () => {
        setShowCotisationsForm(!showCotisationsForm);
    };

    const handleToggleNetForm = () => {
        setShowNetForm(!showNetForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFicheDePaie({
            ...ficheDePaie,
            [name]: value,
        });
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
                    employe_id: employee.id, // Assurez-vous que `employee.id` est défini
                    ...ficheDePaie,
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout de la fiche de paie: ${errorDetails.message}`);
            }

            setSuccess(true);
            setError(null);
            setFicheDePaie({
                mois: '',
                annee: '',
                salaireBrut: '',
                cotisations: '',
                netAPayer: '',

            });
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
            setSuccess(false);
        }
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
                        {showSalaryDetails ? 'Masquer fiche de paie ' : 'Afficher fiche de paie '}
                    </Button>

                </Card.Body>
            </Card>
            <Collapse in={showSalaryDetails}>
                <div className="salary-details mt-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Rubrique de Salaire</Card.Title>
                            <Card.Text>
                                <strong>Salaire Horaire de Base:</strong> {employee.salaireHoraireBase}<br />
                                <strong>Salaire Mensuel de Base:</strong> {employee.salaireMensuelBase}<br />
                                <strong>Indemnité Transport:</strong> {employee.indemniteTransport}<br />
                                <strong>Indemnité Transport 93:</strong> {employee.indemniteTransport93}<br />
                                <strong>Indemnité Logement:</strong> {employee.indemniteLogement}<br />
                                <strong>Prime Présence Horaire:</strong> {employee.primePresenceHoraire}<br />
                                <strong>Prime Présence Mensuelle:</strong> {employee.primePresenceMensuelle}<br />
                                <strong>Prime Transport Horaire:</strong> {employee.primeTransportHoraire}<br />
                                <strong>Prime Transport Mensuelle:</strong> {employee.primeTransportMensuelle}<br />
                                <strong>Prime Logement:</strong> {employee.primeLogement}<br />
                                <strong>Prime Exceptionnelle:</strong> {employee.primeExceptionnelle}<br />
                                <strong>Prime Pénibilité:</strong> {employee.primePenibilite}<br />
                                <strong>Prime Nuit:</strong> {employee.primeNuit}<br />
                                <strong>Prime Panier:</strong> {employee.primePanier}<br />
                                <strong>Prime Productivité:</strong> {employee.primeProductivite}<br />
                                <strong>Heures de Nuit:</strong> {employee.heuresNuit}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>
            <Collapse in={showSalaireBrutForm}>
                <div className="salary-brut-form mt-3">
                    <SalaireBrutForm ficheDePaieId={employee.id} onSuccess={() => alert('Salaire Brut ajouté avec succès !!!')} onError={(error) => alert(error)} />
                </div>
            </Collapse>
            <Collapse in={showCotisationsForm}>
                <div className="cotisations-form mt-3">
                    <CotisationsForm ficheDePaieId={employee.id} onSuccess={() => alert('Cotisation ajoutée avec succès!!')} onError={(error) => alert(error)} />
                </div>
            </Collapse>
            <Collapse in={showNetForm}>
                <div className="net-form mt-3">
                    <NetForm ficheDePaieId={employee.id} onSuccess={() => alert('Net ajouté avec succès!!')} onError={(error) => alert(error)} />
                </div>
            </Collapse>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Créer Fiche de Paie</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Mois</Form.Label>
                            <Form.Control
                                type="text"
                                name="mois"
                                value={ficheDePaie.mois}
                                onChange={handleInputChange}
                                placeholder="Entrez le mois"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Année</Form.Label>
                            <Form.Control
                                type="number"
                                name="annee"
                                value={ficheDePaie.annee}
                                onChange={handleInputChange}
                                placeholder="Entrez l'année"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salaire Brut</Form.Label>
                            <Form.Control
                                type="number"
                                name="salaireBrut"
                                value={ficheDePaie.salaireBrut}
                                onChange={handleInputChange}
                                placeholder="Entrez le salaire brut"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cotisations</Form.Label>
                            <Form.Control
                                type="number"
                                name="cotisations"
                                value={ficheDePaie.cotisations}
                                onChange={handleInputChange}
                                placeholder="Entrez les cotisations"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Net à Payer</Form.Label>
                            <Form.Control
                                type="number"
                                name="netAPayer"
                                value={ficheDePaie.netAPayer}
                                onChange={handleInputChange}
                                placeholder="Entrez le net à payer"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Créer Fiche de Paie
                        </Button>
                        <Button variant="success" onClick={handleToggleSalaireBrutForm} className="mt-2">
                            {showSalaireBrutForm ? 'Masquer Formulaire Salaire Brut' : 'Ajouter Salaire Brut'}
                        </Button>
                        <Button variant="warning" onClick={handleToggleCotisationsForm} className="mt-2">
                            {showCotisationsForm ? 'Masquer Formulaire Cotisations' : 'Ajouter Cotisations'}
                        </Button>
                        <Button variant="secondary" onClick={handleToggleNetForm} className="mt-2">
                            {showNetForm ? 'Masquer Formulaire Net' : 'Ajouter Net'}
                        </Button>
                    </Form>
                    {success && <Alert variant="success" className="mt-3">Fiche de paie créée avec succès!</Alert>}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default FicheDePaie;
