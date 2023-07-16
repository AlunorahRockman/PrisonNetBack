import Cellule from "../models/cellule.js";
import celluleValidation from "../validations/celluleValidation.js";

const createOneCellule = (req, res) => {
    const {body} = req

    const {error} = celluleValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Cellule.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getAllCellule = (req, res) => {
    Cellule.findAll()
        .then(cellules => {
            res.status(200).json(cellules);
        })
        .catch(error => res.status(500).json(error));
};

const getAllCelluleCount = (req, res) => {
    Cellule.findAndCountAll()
    .then(result => {
        const count = result.count;
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json(error));
};


export { createOneCellule, getAllCellule, getAllCelluleCount }