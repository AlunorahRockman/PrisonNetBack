import Visite from "../models/visite.js"


const createOneVisite = (req, res) => {
    const {body} = req

    Visite.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneVisite }