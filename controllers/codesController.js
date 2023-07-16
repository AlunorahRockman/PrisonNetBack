import Code from "../models/code.js"
import nodemailer from 'nodemailer';
import faker from "faker"
import User from "../models/user.js";
import codeValidation from "../validations/codeValidation.js";

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
            // Récupérer l'utilisateur par son ID
            const user = await User.findByPk(idUser);
        
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
        
            // Configurer le transporteur de messagerie
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ainatolotriniavo.a@zurcher.edu.mg',
                    pass: process.env.MOTDEPASSE
                },
            });
        
            // Configurer l'e-mail
            const mailOptions = {
                from: 'ainatolotriniavo.a@zurcher.edu.mg',
                to: user.email, // L'adresse e-mail de l'utilisateur
                subject: 'Votre code de 5 chiffres',
                text: `Bienvenue chez prisonNet. Votre code est : ${code}`,
            };
        
            // Envoyer l'e-mail
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

export { createCode, verifierCode }