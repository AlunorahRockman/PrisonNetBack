import Message from "../models/message.js"


const createOneMessage = (req, res) => {
    const {body} = req

    Message.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

export { createOneMessage }