import Conge from "../models/conge.js"
import Personnel from "../models/personnel.js"
import User from "../models/user.js"
import congesValidation from "../validations/congeValidations.js"
import modifierCongeValidation from "../validations/modifierCongeValidation.js"


const createOneConge = (req, res) => {
    const {body} = req

    const { error } = congesValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Conge.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

const getCongeByOneUser = (req, res) => {
    const idUser = req.params.idUser;

    Conge.findAll({
        where: {
            idPersonnel: idUser,
        }
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

const getAllConge = (req, res) => {
    Conge.findAll({
        include: [
            {
                model: Personnel,
                include: User, // Include the User model within the Personnel model
            },
        ],
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

const getOneConge = (req, res) => {
    const idUser = req.params.idUser;

    Conge.findByPk(idUser)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

async function updateConge(req, res) {
    const { idUser } = req.params
    const { body } = req

    const { error } = modifierCongeValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const conge = await Conge.findByPk(idUser);

        if (!conge) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        if (body.date) {
            conge.description = body.date;
        }
        
        if (body.dateFin) {
            conge.description = body.dateFin;
        }

        if (body.motif) {
            conge.motif = body.motif;
        }

        await conge.save();

        return res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}

const deleteConge = (req, res) => {
    const { id } = req.params

    Conge.destroy({
        where: {
            id: id,
        }
    })
    .then(() => {
        res.status(200).json({ message: "Congé supprimée avec succès." });
    })
    .catch(error => res.status(500).json(error));
};

const congeEnCoursCount = (req, res) => {
    Conge.findAndCountAll({
        where: {
            status: 1,
        }
    })
    .then(result => {
        const count = result.count;
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json(error));
};

const updateCongeStatus = (req, res) => {
    const { idConge } = req.params;

    Conge.findByPk(idConge)
        .then(conge => {
            if (!conge) {
                return res.status(404).json({ message: "Congé non trouvé." });
            }

            conge.status = 1;

            conge.save()
                .then(() => {
                    res.status(200).json({ message: "Statut du congé mis à jour avec succès." });
                })
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};

const updateCongeStatusReff = (req, res) => {
    const { idConge } = req.params;

    Conge.findByPk(idConge)
        .then(conge => {
            if (!conge) {
                return res.status(404).json({ message: "Congé non trouvé." });
            }

            conge.status = 2;

            conge.save()
                .then(() => {
                    res.status(200).json({ message: "Statut du congé mis à jour avec succès." });
                })
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


export { createOneConge, getCongeByOneUser, getAllConge, updateCongeStatus, updateCongeStatusReff
    , getOneConge, updateConge, deleteConge, congeEnCoursCount }