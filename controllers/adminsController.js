import Admin from "../models/admin.js";

const createOneAdmin = (req, res) => {
    const {body} = req

    Admin.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneAdmin }