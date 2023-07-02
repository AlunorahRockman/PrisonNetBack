import Incident from "../models/incident.js"


const createOneIncident = (req, res) => {
    const {body} = req

    Incident.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneIncident }