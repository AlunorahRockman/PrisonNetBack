import Joi from 'joi'

const modifierCongeValidation = (body) => {
    const congesSchema = Joi.object({
        date: Joi.date().required().messages({
            'date.base': 'La date doit être une date valide',
            'any.required': 'La date est obligatoire'
        }),
        dateFin: Joi.date().required().messages({
            'date.base': 'La date doit être une date valide',
            'any.required': 'La date est obligatoire'
        }),
        motif: Joi.string().trim().required().messages({
            'string.base': 'La motif doit être une chaîne de caractères',
            'string.empty': 'La motif de congé ne doit pas être vide',
            'any.required': 'La motif de congé est obligatoire'
        })
    });
    return congesSchema.validate(body)
}

export default modifierCongeValidation