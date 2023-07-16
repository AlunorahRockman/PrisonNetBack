import Joi from 'joi'

const modifierPersonnelValidation = (body) => {
    const personnelsSchema = Joi.object({
        departement: Joi.string().trim().required().messages({
            'string.base': 'Le département doit être une chaîne de caractères',
            'string.empty': 'Le département ne doit pas être vide',
            'any.required': 'Le département est obligatoire'
        }),
        poste: Joi.string().trim().required().messages({
            'string.base': 'Le poste doit être une chaîne de caractères',
            'string.empty': 'Le poste ne doit pas être vide',
            'any.required': 'Le poste est obligatoire'
        }),
        salaire: Joi.number().precision(2).positive().required().messages({
            'number.base': 'Le salaire doit être un nombre',
            'number.precision': 'Le salaire doit avoir une précision de 2 décimales',
            'number.positive': 'Le salaire doit être un nombre positif',
            'any.required': 'Le salaire est obligatoire'
        }),
        dateEmbauche: Joi.date().required().messages({
            'date.base': 'La date d\'embauche doit être une date valide',
            'any.required': 'La date d\'embauche est obligatoire'
        })
    });
    return personnelsSchema.validate(body)
}

export default modifierPersonnelValidation