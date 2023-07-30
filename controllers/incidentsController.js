import Detenus from "../models/detenus.js"
import Incident from "../models/incident.js"
import User from "../models/user.js"
import incidentsValidation from "../validations/incidentValidation.js"
import modifierIncidentValidation from "../validations/modifierIncidentValidation.js"


const createOneIncident = (req, res) => {
    const {body} = req

    const { error } = incidentsValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Incident.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getIncidentByOneUser = (req, res) => {
    const idUser = req.params.idUser;

    Incident.findAll({
        where: {
            userId: idUser,
        },
        include: [
            { model: User },
            { model: Detenus }
        ]
    })
    .then(incidents => {
        res.status(200).json(incidents);
    })
    .catch(error => res.status(500).json(error));
};


const getOneIncident = (req, res) => { 
    const idUser = req.params.idUser;

    Incident.findByPk(idUser)
    .then(incidents => {
        res.status(200).json(incidents);
    })
    .catch(error => res.status(500).json(error));
};

const getAllIncident = (req, res) => {
    Incident.findAll({
        include: [
            {model: User},
            {model: Detenus}
        ]
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};


async function updateIncident(req, res) {
    const { idUser } = req.params;
    const { body } = req

    const { error } = modifierIncidentValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const incident = await Incident.findByPk(idUser);

        if (!incident) {
            return res.status(401).json({ message: "Incidents non trouvé." });
        }

        if (body.description) {
            incident.description = body.description;
        }
        if (body.date) {
            incident.date = body.date;
        }

        await incident.save();

        return res.status(200).json({ message: "Incidents mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}


const deleteIncident = (req, res) => {
    const { id } = req.params

    Incident.destroy({
        where: { 
            id: id,
        }
    })
    .then(() => {
        res.status(200).json({ message: "IncidentPers supprimée avec succès." });
    })
    .catch(error => res.status(500).json(error));
};


export { createOneIncident, getIncidentByOneUser, getAllIncident, 
    getOneIncident, updateIncident, deleteIncident }