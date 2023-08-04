import Code from "../models/code.js"
import nodemailer from 'nodemailer';
import faker from "faker"
import User from "../models/user.js";
import codeValidation from "../validations/codeValidation.js";
import Personnel from "../models/personnel.js";
import Conge from "../models/conge.js";

    const createCode = async (idUser) => {
        const code = faker.random.number({ min: 10000, max: 99999 });
        console.log(code)
        try {
            const newCode = await Code.create({ idUser, code });

            await sendCodeByEmail(idUser, code);

            return newCode;
        } catch (error) {
            throw new Error('Erreur lors de la création du code');
        }
    };


    async function sendCodeByEmail(idUser, code) {
        try {
            
            const user = await User.findByPk(idUser);
        
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
        
            
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ainatolotriniavo.a@zurcher.edu.mg',
                    pass: process.env.MOTDEPASSE
                },
            });
        
            
            const mailOptions = {
                from: 'ainatolotriniavo.a@zurcher.edu.mg',
                to: user.email, 
                subject: 'Votre code de vérification à 5 chiffres - Bienvenue chez PrisonNet',
                text: `Cher utilisateur de PrisonNet,\n\nBienvenue sur notre plateforme ! Votre code de vérification à 5 chiffres est :<span style="font-weight: bold; color: orange;">${code}</span>. 
                Ce code est essentiel pour garantir la sécurité de votre compte.\n\nNous sommes ravis de vous 
                accueillir parmi nous et nous espérons que vous aurez une expérience agréable sur notre site.\n\nL'équipe PrisonNet`,
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                throw new Error('Erreur lors de l\'envoi de l\'e-mail');
            } else {
                console.log('E-mail envoyé avec succès : ' + info.response);
            }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de l\'envoi de l\'e-mail');
        }
    }

    async function  verifierCode (req, res) {
        const { body } = req
        
        const { error } = codeValidation(body)
        if (error) return res.status(401).json(error.details[0].message)
    
        const user = await User.findByPk(body.idUser);

        if (!user) {
            return res.status(401).send("Utilisateur non trouvé");
        }

        const savedCode = await Code.findOne({
            where: { idUser: body.idUser },
            attributes: ['code'],
        });

        if (!savedCode) {
            return res.status(401).send("Code non trouvé");
        }

        if (body.code === savedCode.code) {
            return res.status(201).json({ msg: 'Le code est valide pour cet utilisateur' })
        } else {
            return res.status(401).send("Le code ne correspond pas à celui de cet utilisateur");
        }
    }

    const getPersonnelWithConges = async (req, res) => {
        
        const personnelId = req.params.personnelId;
    
        try {
            const personnel = await Personnel.findByPk(personnelId, { include: Conge });
            if (!personnel) {
                return res.status(404).json({ error: 'Personnel non trouvé' });
            }
            res.json(personnel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération du personnel avec ses congés' });
        }
    };

export { createCode, verifierCode, getPersonnelWithConges }