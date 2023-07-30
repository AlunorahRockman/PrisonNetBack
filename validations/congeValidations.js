import Joi from 'joi'

const congesValidation = (body) => {
    const congesSchema = Joi.object({
        personnelId: Joi.number().integer().required().messages({
            'number.base': 'L\'idPersonnel doit être un nombre entier',
            'any.required': 'L\'idPersonnel est obligatoire'
        }),
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
        }),
        status: Joi.number().integer().required().messages({
            'number.base': 'Le statut doit être un nombre entier',
            'any.required': 'Le statut est obligatoire'
        })
    });
    return congesSchema.validate(body)
}

export default congesValidation