
import Detenus from "../models/detenus.js"
import User from "../models/user.js"
import Visite from "../models/visite.js"
import Visiteur from "../models/visiteur.js"
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
    Visite.findAll({
        include: [
            {
            model: Visiteur,
                include: [
                    { model: User }
                ]
            },
            { model: Detenus }
        ]
    })
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


const updateVisiteStatus = (req, res) => {
    const { idVisite } = req.params;

    Visite.findByPk(idVisite)
        .then(visite => {
            if (!visite) {
                return res.status(404).json({ message: "Visite non trouvé." });
            }

            visite.statut = 1;

            visite.save()
                .then(() => {
                    res.status(200).json({ message: "Statut de la visite mis à jour avec succès." });
                })
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


const updateVisiteStatusReff = (req, res) => {
    const { idVisite } = req.params;

    Visite.findByPk(idVisite)
        .then(visite => {
            if (!visite) {
                return res.status(404).json({ message: "Visite non trouvé." });
            }

            visite.statut = 2;

            visite.save()
                .then(() => {
                    res.status(200).json({ message: "Statut de la visite mis à jour avec succès." });
                })
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};

const getMonVisite = (req, res) => {
    const idUser = req.params.idUser;

    Visite.findAll({ 
        where: {
            visiteurId: idUser,
        },        
        include: [
            { model: Visiteur },
            { model: Detenus }
        ]
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => res.status(500).json(error));
};

export { createOneVisite, getMonVisite, getVisiteByOneUser, getAllVisite, updateVisiteStatusReff
    , updateVisiteStatus , getOneVisite, updateVisite, deleteVisite };

