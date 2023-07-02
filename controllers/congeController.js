import Conge from "../models/conge.js"


const createOneConge = (req, res) => {
    const {body} = req

    Conge.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneConge }