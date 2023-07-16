import Detenus from "../models/detenus.js"
import detenusValidation from "../validations/detenusValidation.js"
import modifierDetenusValidation from "../validations/modifierDetenusValidation.js"


const createOneDetenus = (req, res) => {
    const {body} = req

    const { error } = detenusValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Detenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


const getAllDetenus = (req, res) => {
    Detenus.findAll()
        .then(detenus => {
            res.status(200).json(detenus);
        })
        .catch(error => res.status(500).json(error));
}


const getAllDetenusCount = (req, res) => {
    Detenus.findAndCountAll()
    .then(result => {
        const count = result.count;
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json(error));
};

const getOneDetenus = (req, res) => {
    const id = req.params.id;

    Detenus.findByPk(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};

async function updateDetenus(req, res) {
    const { id } = req.params
    const { body } = req

    const { error } = modifierDetenusValidation (body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const detenus = await Detenus.findByPk(id);

        if (!detenus) {
            return res.status(401).json({ message: "Détenus non trouvé." });
        }

        if (body.nom) {
            detenus.nom = body.nom;
        }

        if (body.prenom) {
            detenus.prenom = body.prenom;
        }
        
        if (body.adresse) {
            detenus.adresse = body.adresse;
        }

        if (body.dateNaissance) {
            detenus.dateNaissance = body.dateNaissance;
        }

        if (body.sexe) {
            detenus.sexe = body.sexe;
        }

        if (body.nationnalite) {
            detenus.nationnalite = body.nationnalite;
        }

        if (body.dureePeine) {
            detenus.dureePeine = body.dureePeine;
        }

        if (body.dateVenue) {
            detenus.dateVenue = body.dateVenue;
        }

        if (body.raison) {
            detenus.raison = body.raison;
        }


        await detenus.save();

        return res.status(200).json({ message: "Détenus mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}


export { createOneDetenus, getAllDetenus, getAllDetenusCount, getOneDetenus, updateDetenus}