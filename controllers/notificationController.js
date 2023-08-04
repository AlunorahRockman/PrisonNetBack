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


const getNotificationByOneUser = async (req, res) => {
    const {idUser} = req.params;

    try {
        const notifications = await Notification.findAll({
            where: {
                userId: idUser
            },
            include: [
                {
                    model: User,
                    as: 'senderNotif',
                    attributes: ['nom', 'email', 'image'] 
                },
                {
                    model: User,
                    as: 'receiverNotif',
                    attributes: ['nom', 'email', 'image']
                }
            ],
            order: [['createdAt', 'desc']],
        });

        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export { createOneNotification, getNotificationByOneUser }