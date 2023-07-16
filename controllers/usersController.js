import User from "../models/user.js"
import usersValidation from "../validations/usersValidation.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import loginValidation from "../validations/loginValidation.js"
import emailValidation from "../validations/emailValidation.js"
import nouveauPassValidation from "../validations/nouveauPassValidation.js"
import { Op } from 'sequelize';
import usersModifierValidation from "../validations/modifierUserValidation.js"

dotenv.config({path:'.env'})

async function verifierEmail(req, res){
    const {body} = req

    const {error} = emailValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    try{
        const user = await User.findOne({
            where: {
                email: body.email,
            }
        })

        if(!user){
            return res.status(401).send("L'utilisateur n'existe pas.")
        }

        return res.status(200).send(user)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erreur du serveur." });
    }
}

const modifierMotdepasse = async (req, res) => {
        const { body } = req;
        
        const { error } = nouveauPassValidation(body);
        if (error) return res.status(401).json(error.details[0].message);

        try {
        const user = await User.findByPk(body.userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        if (body.nouveauPass !== body.confirmPass) {
            return res.status(401).json({ message: "Le mot de passe de confirmation doit correspondre au nouveau mot de passe." });
        }

        const hashedPassword = await bcrypt.hash(body.nouveauPass, 10);

        user.motdepasse = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Le mot de passe a été modifié avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
};

async function loginUser(req, res){
    const { body } = req

    const {error} = loginValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const user = await User.findOne({
            where: {
                email: body.email,
            },
        });
        
        if (!user) {
            return res.status(401).send("L'utilisateur n'existe pas.");
        }

        if (!user.estValide) {
            return res.status(401).send("Le compte utilisateur n'est pas validé.");
        }

        const passMatch = bcrypt.compareSync(body.motdepasse, user.motdepasse);
        if (!passMatch) {
            return res.status(401).send("Mot de passe incorrect.");
        }
        const accessToken = jwt.sign(
            { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email , type_compte:user.typeCompte, adresse: user.adresse, dateNaissance: user.dateNaissance, phone: user.phone, sexe: user.sexe, image: user.image},
                process.env.ACCESS_SECRET,
            { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
            { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email , type_compte:user.typeCompte, adresse: user.adresse, dateNaissance: user.dateNaissance, phone: user.phone, sexe: user.sexe, image: user.image},
                process.env.REFRESH_SECRET,
            { expiresIn: "24h" }
        );
        return res.status(200).send({ access: accessToken, refresh: refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erreur du serveur." });
    }
}

async function validateUser(req, res){
    const { idUser } = req.params;

    try {
        const user = await User.findByPk(idUser);

        if (!user) {
            return res.status(404).send("L'utilisateur n'existe pas.");
        }

        user.estValide = true;

        await user.save();

        return res.status(200).send("Le compte utilisateur a été validé avec succès.");
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erreur du serveur." });
    }
}

const createOneUser = async (req, res) => {
    const { body } = req
    
    const { error } = usersValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const existingUser = await User.findOne({ where: { email: body.email } });

        if (existingUser) {
            return res.status(401).send("L'e-mail existe déjà.");
        }

        console.log(body.motdepasse)

        const createdUser = await User.create({ ...body }); 

        res.status(201).json({ id: createdUser.get('id'), msg: 'Resource créée avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}

const getAllUser = (req, res) => {
    const excludedId = req.params.excludedId;

    User.findAll({
        where: {
            id: {
                [Op.not]: excludedId
            }
        }
    })
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => res.status(500).json(error));
};

async function updateUser(req, res) {
    const { userId } = req.params;
    const { body } = req

    const { error } = usersModifierValidation(body)
    if (error) return res.status(401).json(error.details[0].message)

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        if (body.nom) {
            user.nom = body.nom;
        }
        if (body.prenom) {
            user.prenom = body.prenom;
        }
        if (body.email) {
            user.email = body.email;
        }
        if (body.adresse) {
            user.adresse = body.adresse;
        }
        if (body.dateNaissance) {
            user.dateNaissance = body.dateNaissance;
        }
        if (body.phone) {
            user.phone = body.phone;
        }
        if (body.sexe) {
            user.sexe = body.sexe;
        }

        await user.save();

        return res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}



export {createOneUser, loginUser, validateUser, verifierEmail, modifierMotdepasse, getAllUser, updateUser}