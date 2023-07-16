import User from "../models/user.js";
import Visiteur from "../models/visiteur.js";

const createOneVisiteur = (req, res) => {
    const {body} = req

    Visiteur.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getAllVisiteur = (req, res) => {
    User.findAll({
        where: {
            typeCompte: "Visiteur",
        }
    })
    .then(visiteurs => {
        res.status(200).json(visiteurs);
    })
    .catch(error => res.status(500).json(error));
};

const getAllVisiteurCount = (req, res) => {
    User.findAndCountAll({
        where: {
            typeCompte: "Visiteur",
        }
    })
    .then(result => {
        const count = result.count;
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json(error));
};


export { createOneVisiteur, getAllVisiteur, getAllVisiteurCount }