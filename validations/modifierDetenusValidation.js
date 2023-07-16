import Joi from "joi"

const modifierDetenusValidation = (body) => {
    const detenusSchema = Joi.object({
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
            sexe: Joi.string().valid('M', 'F').required().messages({
                'any.only': 'Le sexe doit être soit "M" (masculin) ou "F" (féminin)',
                'any.required': 'Le sexe est obligatoire'
            }),
            nationnalite: Joi.string().min(1).max(100).trim().required().messages({
                'string.base': 'Le nationnalité doit être une chaîne de caractères',
                'string.empty': 'Le nationnalité ne doit pas être vide',
                'string.min': 'Le nationnalité doit contenir au moins {#limit} caractères',
                'string.max': 'Le nationnalité doit contenir au plus {#limit} caractères',
                'any.required': 'Le nationnalité est obligatoire'
            }), 
            dureePeine: Joi.number().integer().required().messages({
                'number.base': 'La duree de peine doit être un nombre entier',
                'any.required': 'La duree de peine est obligatoire'
            }),
            dateVenue: Joi.date().required().messages({
                'date.base': 'La date de venue doit être une date valide',
                'any.required': 'La date de venue est obligatoire'
            }),
            raison: Joi.string().trim().required().messages({
                'string.base': 'La raison doit être une chaîne de caractères',
                'string.empty': 'La raison ne doit pas être vide',
                'any.required': 'La raison est obligatoire'
            })

        })
    return detenusSchema.validate(body)
}

export default modifierDetenusValidation