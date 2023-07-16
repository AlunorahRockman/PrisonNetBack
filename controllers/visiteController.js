
import Visite from "../models/visite.js"
import modifierVisiteValidation from "../validations/modifierVisiteValidation.js"
import visiteValidation from "../validations/visiteValidation.js"


const createOneVisite = (req, res) => {
    const {body} = req

    const {error} = visiteValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    Visite.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getVisiteByOneUser = (req, res) => {
    const idUser = req.params.idUser;

    Visite.findAll({
        where: {
            idVisiteur: idUser,
        }
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};


const getAllVisite = (req, res) => {
    Visite.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

const getOneVisite = (req, res) => {
    const idUser = req.params.idUser;

    Visite.findByPk(idUser)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

async function updateVisite(req, res) {
    const { idUser } = req.params
    const { body } = req

    const { error } = modifierVisiteValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const conge = await Visite.findByPk(idUser);

        if (!conge) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        if (body.dateVisite) {
            conge.dateVisite = body.dateVisite;
        }
        
        if (body.description) {
            conge.description = body.description;
        }

        if (body.heure) {
            conge.heure = body.heure;
        }

        await conge.save();

        return res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}

const deleteVisite = (req, res) => {
    const { id } = req.params

    Visite.destroy({
        where: {
            id: id,
        }
    })
    .then(() => {
        res.status(200).json({ message: "Visite supprimée avec succès." });
    })
    .catch(error => res.status(500).json(error));
};

export { createOneVisite, getVisiteByOneUser, getAllVisite, getOneVisite, updateVisite, deleteVisite };

