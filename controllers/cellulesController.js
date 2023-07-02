import Cellule from "../models/cellule.js";

const createOneCellule = (req, res) => {
    const {body} = req

    Cellule.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneCellule }