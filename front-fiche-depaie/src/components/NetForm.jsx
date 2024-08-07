import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const NetForm = ({ ficheDePaieId, onSuccess, onError }) => {
    const [netData, setNetData] = useState({
        fiche_de_paie_id: ficheDePaieId,
        acomptePerçu: '',
        pretSociete: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNetData({
            ...netData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/nets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(netData),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout du net: ${errorDetails.message}`);
            }

            setSuccess(true);
            setError(null);
            setNetData({
                fiche_de_paie_id: ficheDePaieId,
                acomptePerçu: '',
                pretSociete: ''
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
            <h4>Ajouter Net</h4>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Acompte Perçu</Form.Label>
                    <Form.Control
                        type="number"
                        name="acomptePerçu"
                        value={netData.acomptePerçu}
                        onChange={handleInputChange}
                        placeholder="Entrez l'acompte perçu"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prêt Société</Form.Label>
                    <Form.Control
                        type="number"
                        name="pretSociete"
                        value={netData.pretSociete}
                        onChange={handleInputChange}
                        placeholder="Entrez le prêt société"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ajouter Net
                </Button>
                {success && <Alert variant="success" className="mt-3">Net ajouté avec succès!</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </div>
    );
};

export default NetForm;
