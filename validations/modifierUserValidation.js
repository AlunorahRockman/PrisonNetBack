import Joi from "joi"

const usersModifierValidation = (body) => {
    const userSchema = Joi.object({
            nom: Joi.string().min(3).max(40).trim().required().messages({
                'string.base': 'Le nom doit être une chaîne de caractères',
                'string.empty': 'Le nom ne doit pas être vide',
                'string.min': 'Le nom doit contenir au moins {#limit} caractères',
                'string.max': 'Le nom doit contenir au plus {#limit} caractères',
                'any.required': 'Le nom est obligatoire'
            }),
            prenom: Joi.string().min(3).max(40).trim().required().messages({
                'string.base': 'Le prénom doit être une chaîne de caractères',
                'string.empty': 'Le prénom ne doit pas être vide',
                'string.min': 'Le prénom doit contenir au moins {#limit} caractères',
                'string.max': 'Le prénom doit contenir au plus {#limit} caractères',
                'any.required': 'Le prénom est obligatoire'
            }),
            email: Joi.string().min(6).max(40).trim().required().email().messages({
                'string.base': 'L\'email doit être une chaîne de caractères',
                'string.empty': 'L\'email ne doit pas être vide',
                'string.min': 'L\'email doit contenir au moins {#limit} caractères',
                'string.max': 'L\'email doit contenir au plus {#limit} caractères',
                'string.email': 'L\'email doit être une adresse email valide',
                'any.required': 'L\'email est obligatoire'
            }),
            adresse: Joi.string().min(3).max(100).trim().required().messages({
                'string.base': 'L\'adresse doit être une chaîne de caractères',
                'string.empty': 'L\'adresse ne doit pas être vide',
                'string.min': 'L\'adresse doit contenir au moins {#limit} caractères',
                'string.max': 'L\'adresse doit contenir au plus {#limit} caractères',
                'any.required': 'L\'adresse est obligatoire'
            }),
            dateNaissance: Joi.date().required().messages({
                'date.base': 'La date de naissance doit être une date valide',
                'any.required': 'La date de naissance est obligatoire'
            }),
            phone: Joi.string().trim().required().messages({
                'string.base': 'Le numéro de téléphone doit être une chaîne de caractères',
                'string.empty': 'Le numéro de téléphone ne doit pas être vide',
                'any.required': 'Le numéro de téléphone est obligatoire'
            }),
            sexe: Joi.string().valid('M', 'F').required().messages({
                'any.only': 'Le sexe doit être soit "M" (masculin) ou "F" (féminin)',
                'any.required': 'Le sexe est obligatoire'
            })
        })
    return userSchema.validate(body)
}

export default usersModifierValidation