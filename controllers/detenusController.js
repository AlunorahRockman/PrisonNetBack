import Detenus from "../models/detenus.js"


const createOneDetenus = (req, res) => {
    const {body} = req

    Detenus.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneDetenus }