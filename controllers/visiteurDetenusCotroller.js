import Detenus from "../models/detenus.js"
import User from "../models/user.js"
import Visiteur from "../models/visiteur.js"
import VisiteurDetenus from "../models/visiteur_detenus.js"


const createOneVisiteurDetenus = (req, res) => {
    const {body} = req

    VisiteurDetenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

const getDetenusByOneUser =  (req, res) => {
    const utilisateurId = req.params.id;

    try {
        const visiteurDetenus = VisiteurDetenus.findAll({
            where: { idVisiteur: utilisateurId },
            include: [{ model: Detenus }],
        });

        const detenus = visiteurDetenus.map((visiteurDetenu) => visiteurDetenu.Detenu);

        res.json(detenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des détenus." });
    }
}

const getOneVisiteurs = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

const getMonDetenus = (req, res) => {
    const idUser = req.params.idUser;

    VisiteurDetenus.findAll({
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


const getIdVisiteurByUser = (req, res) => {
    const idUser = req.params.idUser;

    Visiteur.findOne({
        where: {
            userId: idUser,
        }
    })
    .then(result => {
        res.status(200).json(result.id);
    })
    .catch(error => res.status(500).json(error));
};

export { createOneVisiteurDetenus, getDetenusByOneUser, getIdVisiteurByUser, getMonDetenus, getOneVisiteurs }