import Message from "../models/message.js"


const createOneMessage = (req, res) => {
    const {body} = req

    Message.create({...body})
    .then(() => {
        res.status(201).json({msg: 'Created Ressource'})
    })
    .catch(error => res.status(500).json(error))
}


    const getMessages = async (req, res) => {
        const { idRecever, idSender } = req.params;
    
        try {
        const messages = await Message.findAll({
            where: {
                idRecever: idRecever,
                idSender: idSender
            }
        });
    
        res.json(messages);
        } catch (error) {
            console.error('Error retrieving messages:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };


export { createOneMessage, getMessages}