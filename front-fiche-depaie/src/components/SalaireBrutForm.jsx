import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SalaireBrutForm = ({ ficheDePaieId, onSuccess, onError }) => {
    const [salaireBrutData, setSalaireBrutData] = useState({
       
        fiche_de_paie_id: ficheDePaieId, // Assurez-vous que fiche_de_paie_id est défini ici
        salaireHoraireBase: '',
        salaireMensuelBase: '',
        indemniteTransport: '',
        indemniteTransport93: '',
        indemniteLogement: '',
        primePresenceHoraire: '',
        primePresenceMensuelle: '',
        primeTransportHoraire: '',
        primeTransportMensuelle: '',
        primeLogement: '',
        primeExceptionnelle: '',
        primePenibilite: '',
        primeNuit: '',
        primePanier: '',
        primeProductivite: '',
        heuresNuit: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSalaireBrutData({
            ...salaireBrutData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/salaire_bruts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(salaireBrutData), // Vérifiez ici que fiche_de_paie_id est inclus
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Échec de l'ajout du salaire brut: ${errorDetails.message}`);
            }

            setSuccess(true);
            setError(null);
            setSalaireBrutData({
                fiche_de_paie_id: ficheDePaieId, // Réinitialiser avec fiche_de_paie_id
                salaireHoraireBase: '',
                salaireMensuelBase: '',
                indemniteTransport: '',
                indemniteTransport93: '',
                indemniteLogement: '',
                primePresenceHoraire: '',
                primePresenceMensuelle: '',
                primeTransportHoraire: '',
                primeTransportMensuelle: '',
                primeLogement: '',
                primeExceptionnelle: '',
                primePenibilite: '',
                primeNuit: '',
                primePanier: '',
                primeProductivite: '',
                heuresNuit: ''
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
            <h4>Ajouter Salaire Brut</h4>
           
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Salaire Horaire de Base</Form.Label>
                    <Form.Control
                        type="number"
                        name="salaireHoraireBase"
                        value={salaireBrutData.salaireHoraireBase}
                        onChange={handleInputChange}
                        placeholder="Entrez le salaire horaire de base"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Salaire Mensuel de Base</Form.Label>
                    <Form.Control
                        type="number"
                        name="salaireMensuelBase"
                        value={salaireBrutData.salaireMensuelBase}
                        onChange={handleInputChange}
                        placeholder="Entrez le salaire mensuel de base"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Indemnité Transport</Form.Label>
                    <Form.Control
                        type="number"
                        name="indemniteTransport"
                        value={salaireBrutData.indemniteTransport}
                        onChange={handleInputChange}
                        placeholder="Entrez l'indemnité transport"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Indemnité Transport 93</Form.Label>
                    <Form.Control
                        type="number"
                        name="indemniteTransport93"
                        value={salaireBrutData.indemniteTransport93}
                        onChange={handleInputChange}
                        placeholder="Entrez l'indemnité transport 93"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Indemnité Logement</Form.Label>
                    <Form.Control
                        type="number"
                        name="indemniteLogement"
                        value={salaireBrutData.indemniteLogement}
                        onChange={handleInputChange}
                        placeholder="Entrez l'indemnité logement"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Présence Horaire</Form.Label>
                    <Form.Control
                        type="number"
                        name="primePresenceHoraire"
                        value={salaireBrutData.primePresenceHoraire}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime présence horaire"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Présence Mensuelle</Form.Label>
                    <Form.Control
                        type="number"
                        name="primePresenceMensuelle"
                        value={salaireBrutData.primePresenceMensuelle}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime présence mensuelle"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Transport Horaire</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeTransportHoraire"
                        value={salaireBrutData.primeTransportHoraire}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime transport horaire"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Transport Mensuelle</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeTransportMensuelle"
                        value={salaireBrutData.primeTransportMensuelle}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime transport mensuelle"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Logement</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeLogement"
                        value={salaireBrutData.primeLogement}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime logement"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Exceptionnelle</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeExceptionnelle"
                        value={salaireBrutData.primeExceptionnelle}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime exceptionnelle"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Pénibilité</Form.Label>
                    <Form.Control
                        type="number"
                        name="primePenibilite"
                        value={salaireBrutData.primePenibilite}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime pénibilité"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Nuit</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeNuit"
                        value={salaireBrutData.primeNuit}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime nuit"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Panier</Form.Label>
                    <Form.Control
                        type="number"
                        name="primePanier"
                        value={salaireBrutData.primePanier}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime panier"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prime Productivité</Form.Label>
                    <Form.Control
                        type="number"
                        name="primeProductivite"
                        value={salaireBrutData.primeProductivite}
                        onChange={handleInputChange}
                        placeholder="Entrez la prime productivité"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Heures de Nuit</Form.Label>
                    <Form.Control
                        type="number"
                        name="heuresNuit"
                        value={salaireBrutData.heuresNuit}
                        onChange={handleInputChange}
                        placeholder="Entrez les heures de nuit"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ajouter Salaire Brut
                </Button>
                {success && <Alert variant="success" className="mt-3">Salaire Brut ajouté avec succès!</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </div>
    );
};

export default SalaireBrutForm;

