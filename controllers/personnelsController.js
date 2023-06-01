import Personnel from "../models/personnel.js";
import personnelsValidation from "../validations/personnelsValidation.js";


const createOnePersonnel = (req, res) => {
    const {body} = req
    const {error} = personnelsValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    Personnel.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOnePersonnel }