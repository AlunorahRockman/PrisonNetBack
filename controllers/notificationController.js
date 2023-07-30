import Notification from "../models/notification.js"
import User from "../models/user.js"


const createOneNotification = (req, res) => {
    const {body} = req

    Notification.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}

const getNotificationByOneUser = (req, res) => {
    const idUser = req.params.idUser
    
    Notification.findAll({
        where: {
            userId: idUser
        },
        include: User
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => res.status(500).json(error))
}



export { createOneNotification, getNotificationByOneUser }