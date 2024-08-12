import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const CotisationForm = ({ ficheDePaie }) => {
    const [cotisation, setCotisation] = useState({
        fiche_de_paie_id: ficheDePaie?.id || '',
        cotisationCNSS: '',
        cotisationIRPP: '',
        assuranceGroupe: '',
        cotisationCAVIS: '',
    });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCotisation(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cotisations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cotisation),
            });

            if (response.ok) {
                setSuccess('Cotisation ajoutée avec succès !');
                setError(null);
            } else {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout de la cotisation: ${errorDetails.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Cotisation CNSS</Form.Label>
                <Form.Control
                    type="text"
                    name="cotisationCNSS"
                    value={cotisation.cotisationCNSS}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Cotisation IRPP</Form.Label>
                <Form.Control
                    type="text"
                    name="cotisationIRPP"
                    value={cotisation.cotisationIRPP}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Assurance Groupe</Form.Label>
                <Form.Control
                    type="text"
                    name="assuranceGroupe"
                    value={cotisation.assuranceGroupe}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Cotisation CAVIS</Form.Label>
                <Form.Control
                    type="text"
                    name="cotisationCAVIS"
                    value={cotisation.cotisationCAVIS}
                    onChange={handleInputChange}
                />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Button variant="primary" type="submit">Ajouter Cotisation</Button>
        </Form>
    );
};

export default CotisationForm;
