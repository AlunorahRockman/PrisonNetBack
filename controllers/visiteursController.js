import Visiteur from "../models/visiteur.js";

const createOneVisiteur = (req, res) => {
    const {body} = req

    Visiteur.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneVisiteur }