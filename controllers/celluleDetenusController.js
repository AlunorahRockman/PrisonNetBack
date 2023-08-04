import Cellule from "../models/cellule.js"
import CelluleDetenus from "../models/cellule_detenus.js"
import Detenus from "../models/detenus.js"

const createOneCelluleDetenus = (req, res) => {
    const {body} = req

    CelluleDetenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getDetenusByOneCellule = (req, res) => {
    const idCellule = req.params.idCellule;

    CelluleDetenus.findAll({
        where: {
            celluleId: idCellule,
        },        
        include: [
            { model: Cellule },
            { model: Detenus }
        ]
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => res.status(500).json(error));
};

const deleteDetenusCellule = (req, res) => {
    const { id } = req.params

    CelluleDetenus.destroy({
        where: { 
            id: id,
        }
    })
    .then(() => {
        res.status(200).json({ message: "IncidentPers supprimée avec succès." });
    })
    .catch(error => res.status(500).json(error));
};

export { createOneCelluleDetenus, getDetenusByOneCellule, deleteDetenusCellule }