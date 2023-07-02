import VisiteurDetenus from "../models/visiteur_detenus.js"


const createOneVisiteurDetenus = (req, res) => {
    const {body} = req

    VisiteurDetenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneVisiteurDetenus }