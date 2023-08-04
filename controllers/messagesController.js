import Message from "../models/message.js"
import User from "../models/user.js"
import sequelize from "sequelize";
import database from "../database/database.js";

const { Op } = sequelize; 


const createOneMessage = async (req, res) => {
    try {

    const { idSender, idRecever, message, estVue } = req.body;


    const newMessage = new Message({
        idSender,
        idRecever,
        message,
        estVue,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error creating message:', error);
    }
};

const getAllMessagesBetweenTwoUsers = async (req, res) => {
    const { idSender, idRecever } = req.params;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { idSender: idSender, idRecever: idRecever },
                    { idSender: idRecever, idRecever: idSender }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['nom', 'email', 'image'] 
                },
                {
                    model: User,
                    as: 'receiver',
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


export { createOneMessage, getAllMessagesBetweenTwoUsers}