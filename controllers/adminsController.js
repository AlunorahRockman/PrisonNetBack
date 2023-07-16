import Admin from "../models/admin.js";
import User from "../models/user.js";

const createOneAdmin = (req, res) => {
    const {body} = req

    Admin.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

const getAllAdmin = (req, res) => {
    User.findAll({
        where: {
            typeCompte: "Admin",
        }
    })
    .then(Admins => {
        res.status(200).json(Admins);
    })
    .catch(error => res.status(500).json(error));
};

export { createOneAdmin, getAllAdmin }