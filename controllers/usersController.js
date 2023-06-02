import User from "../models/user.js"
import usersValidation from "../validations/usersValidation.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import loginValidation from "../validations/loginValidation.js"

dotenv.config({path:'.env'})

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

        if (!user.estValide) {
            return res.status(401).send("Le compte utilisateur n'est pas validé.");
        }

        if (!user) {
            return res.status(401).send("L'utilisateur n'existe pas.");
        }
        const passMatch = await bcrypt.compare(body.motdepasse, user.motdepasse);
        if (!passMatch) {
            return res.status(401).send("Mot de passe incorrect.");
        }
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.ACCESS_SECRET,
            { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
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

        const hashedPassword = await bcrypt.hash(body.motdepasse, 10);

        const createdUser = await User.create({ ...body, motdepasse: hashedPassword });

        res.status(201).json({ id: createdUser.get('id'), msg: 'Resource créée avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur du serveur." });
    }
}


export {createOneUser, loginUser, validateUser}