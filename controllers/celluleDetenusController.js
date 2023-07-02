import CelluleDetenus from "../models/cellule_detenus.js"

const createOneCelluleDetenus = (req, res) => {
    const {body} = req

    CelluleDetenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneCelluleDetenus }