import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const CotisationForm = ({ ficheDePaieId, onSuccess, onError }) => {
    const [cotisationData, setCotisationData] = useState({
        fiche_de_paie_id: ficheDePaieId,
        cotisationCNSS: '',
        cotisationIRPP: '',
        assuranceGroupe: '',
        cotisationCAVIS: '',
        regularisationFinExercice: '',
        accidentTravail: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCotisationData({
            ...cotisationData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cotisations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cotisationData),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout de la cotisation: ${errorDetails.message}`);
            }

            setSuccess(true);
            setError(null);
            setCotisationData({
                fiche_de_paie_id: ficheDePaieId,
                cotisationCNSS: '',
                cotisationIRPP: '',
                assuranceGroupe: '',
                cotisationCAVIS: '',
                regularisationFinExercice: '',
                accidentTravail: ''
            });
            onSuccess();
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
            setSuccess(false);
            onError(error.message);
        }
    };

    return (
        <div>
            <h4>Ajouter Cotisation</h4>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Cotisation CNSS</Form.Label>
                    <Form.Control
                        type="number"
                        name="cotisationCNSS"
                        value={cotisationData.cotisationCNSS}
                        onChange={handleInputChange}
                        placeholder="Entrez la cotisation CNSS"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cotisation IRPP</Form.Label>
                    <Form.Control
                        type="number"
                        name="cotisationIRPP"
                        value={cotisationData.cotisationIRPP}
                        onChange={handleInputChange}
                        placeholder="Entrez la cotisation IRPP"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Assurance Groupe</Form.Label>
                    <Form.Control
                        type="number"
                        name="assuranceGroupe"
                        value={cotisationData.assuranceGroupe}
                        onChange={handleInputChange}
                        placeholder="Entrez l'assurance groupe"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cotisation CAVIS</Form.Label>
                    <Form.Control
                        type="number"
                        name="cotisationCAVIS"
                        value={cotisationData.cotisationCAVIS}
                        onChange={handleInputChange}
                        placeholder="Entrez la cotisation CAVIS"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Régularisation Fin d'Exercice</Form.Label>
                    <Form.Control
                        type="number"
                        name="regularisationFinExercice"
                        value={cotisationData.regularisationFinExercice}
                        onChange={handleInputChange}
                        placeholder="Entrez la régularisation de fin d'exercice"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Accident de Travail</Form.Label>
                    <Form.Control
                        type="number"
                        name="accidentTravail"
                        value={cotisationData.accidentTravail}
                        onChange={handleInputChange}
                        placeholder="Entrez la cotisation pour accident de travail"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ajouter Cotisation
                </Button>
                {success && <Alert variant="success" className="mt-3">Cotisation ajoutée avec succès!</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </div>
    );
};

export default CotisationForm;
