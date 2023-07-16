import Detenus from "../models/detenus.js"
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

export { createOneVisiteurDetenus, getDetenusByOneUser }