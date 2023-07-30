import Personnel from "../models/personnel.js";
import personnelsValidation from "../validations/personnelsValidation.js";
import User from "../models/user.js";
import modifierCongeValidation from "../validations/modifierCongeValidation.js";
import modifierPersonnelValidation from "../validations/modifierPersonnelValidation.js";
import Conge from "../models/conge.js";



const createOnePersonnel = (req, res) => {
    const {body} = req
    const {error} = personnelsValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Personnel.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

const getAllPersonnelsSix = (req, res) => {
    Personnel.findAll({
        include: User,
        order: [['id', 'DESC']],
        limit: 6, 
        })
        .then(personnels => {
            res.status(200).json(personnels);
        })
        .catch(error => res.status(500).json(error));
};


const getAllPersonnelsUser = (req, res) => {
    Personnel.findAll({ include: User })
        .then(personnels => {
            res.status(200).json(personnels);
        })
        .catch(error => res.status(500).json(error));
};

const getPersonnelCongeByUser = (req, res) => {
    const idUser = req.params.idUser;

    Conge.findAll({
        where: {
            personnelId: idUser,
        },
        include: Personnel, 
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    });
};

const getAllPersonnelsCount = (req, res) => {
    User.findAndCountAll({
        where: {
            typeCompte: "Personnel",
        }
    })
    .then(result => {
        const count = result.count;
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json(error));
};


const getOnePersonnels = (req, res) => {
    const idUser = req.params.idUser;

    User.findByPk(idUser)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

const getPersonnelByOneUser = (req, res) => {
    const idUser = req.params.idUser;

    Personnel.findAll({
        where: {
            userId: idUser,
        }
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

async function updatePersonnel(req, res) {
    const { id } = req.params
    const { body } = req

    const { error } = modifierPersonnelValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const personnel = await Personnel.findByPk(id);

        if (!personnel) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        if (body.dateEmbauche) {
            personnel.dateEmbauche = body.dateEmbauche;
        }
        
        if (body.departement) {
            personnel.departement = body.departement;
        }

        if (body.poste) {
            personnel.poste = body.poste;
        }

        if (body.salaire) {
            personnel.salaire = body.salaire;
        }

        await personnel.save();

        return res.status(200).json({ message: "Personnel mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}


const getIdPersonnelByUser = (req, res) => {
    const idUser = req.params.idUser;

    Personnel.findOne({
        where: {
            userId: idUser,
        },        
        include: Conge,
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => res.status(500).json(error));
};


const getIdPersByUser = (req, res) => {
    const idUser = req.params.idUser;

    Personnel.findOne({
        where: {
            userId: idUser,
        }
    })
    .then(result => {
        res.status(200).json(result.id);
    })
    .catch(error => res.status(500).json(error));
};

export { createOnePersonnel, getAllPersonnelsUser, getPersonnelCongeByUser, getIdPersByUser,
    getAllPersonnelsSix, getIdPersonnelByUser, getAllPersonnelsCount, getOnePersonnels,
    getPersonnelByOneUser, updatePersonnel}