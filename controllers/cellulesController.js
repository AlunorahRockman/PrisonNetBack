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

async function updateCellule(req, res) {
    const { id } = req.params
    const { body } = req

    const { error } = celluleValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const cellule = await Cellule.findByPk(id);

        if (!cellule) {
            return res.status(401).json({ message: "Cellule non trouvé." });
        }


        if (body.numero) {
            cellule.numero = body.numero;
        }

        if (body.capaciteMax) {
            cellule.capaciteMax = body.capaciteMax;
        }

        if (body.superficie) {
            cellule.superficie = body.superficie;
        }

        if (body.statut) {
            cellule.statut = body.statut;
        }


        await cellule.save();

        return res.status(200).json({ message: "cellule mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}


const deleteCellule = (req, res) => {
    const { id } = req.params

    Cellule.destroy({
        where: {
            id: id,
        }
    })
    .then(() => {
        res.status(200).json({ message: "Cellule supprimée avec succès." });
    })
    .catch(error => res.status(500).json(error));
};


export { createOneCellule, getAllCellule, getAllCelluleCount, updateCellule, deleteCellule }