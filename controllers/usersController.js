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
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import nouveauPassCompteValidation from "../validations/nouveauPassCompteValidation.js"


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

            if (user.estBloque === true) {
                return res.status(401).send("Votre compte est bloqué.");
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

const uploadDir = './images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const fileNameWithoutExtension = req.params.nom;
        const ext = '.jpg';
        cb(null, fileNameWithoutExtension + ext);
    },
});

const upload = multer({ storage: storage });

const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: "Erreur du serveur lors du téléchargement de l'image." });
        }

        return res.status(200).json({ message: "L'image a été téléchargée avec succès." });
    });
};


async function setImage(req, res) {
    const { idUser, image } = req.params;

    console.log(idUser)
    console.log(image)
    
    try {
        const user = await User.findByPk(idUser);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        user.image = image + ".jpg";

        await user.save();

        return res.status(200).json({ message: "Image de l'utilisateur mise à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'image de l'utilisateur." });
    }
}

const getOneUsers = (req, res) => {
    const idUser = req.params.idUser;

    User.findByPk(idUser)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => res.status(500).json(error));
};


const modifierMotdepasseCompte = async (req, res) => {
        const { body } = req;
        
        const { error } = nouveauPassCompteValidation(body);
        if (error) return res.status(401).json(error.details[0].message);

        try {
        const user = await User.findByPk(body.userId);

        if (!user) {
            return res.status(401).json("Utilisateur non trouvé.");
        }


        if (!await bcrypt.compare(body.motdepasseActuel, user.motdepasse)) {
            return res.status(401).json("Mot de passe actuel incorrect!");
        }

        if (body.nouveauPass !== body.confirmPass) {
            return res.status(401).json("Le mot de passe de confirmation doit correspondre au nouveau mot de passe.");
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

const bloqueUser = async (req, res) => {
    const { idUser } = req.params;
    
    const user = await User.findByPk(idUser);

    if (!user) {
        return res.status(401).json("Utilisateur non trouvé.");
    }

    user.estBloque = user.estBloque === true ? false : true;
    await user.save();

    const action = user.estBloque === 1 ? "bloqué" : "débloqué";

    return res.status(200).json({ message: `L'utilisateur a été ${action}!` });
};



export {createOneUser, loginUser, setImage ,validateUser, verifierEmail, getOneUsers, bloqueUser,
    uploadImage, modifierMotdepasse, getAllUser, updateUser, modifierMotdepasseCompte}