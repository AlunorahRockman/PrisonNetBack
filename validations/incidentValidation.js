import Joi from 'joi'

const incidentsValidation = (body) => {
    const incidentsSchema = Joi.object({
        idDetenus: Joi.number().integer().required().messages({
            'number.base': 'L\'idDetenus doit être un nombre entier',
            'any.required': 'L\'idDetenus est obligatoire'
        }),
        idPersonnel: Joi.number().integer().required().messages({
            'number.base': 'L\'idPersonnel doit être un nombre entier',
            'any.required': 'L\'idPersonnel est obligatoire'
        }),
        description: Joi.string().trim().required().messages({
            'string.base': 'Le description doit être une chaîne de caractères',
            'string.empty': 'Le description de l\'incident ne doit pas être vide',
            'any.required': 'Le description de l\'incident est obligatoire'
        }),
        date: Joi.date().required().messages({
            'date.base': 'La date doit être une date valide',
            'any.required': 'La date est obligatoire'
        }),
        statut: Joi.number().integer().required().messages({
            'number.base': 'Le statut doit être un nombre entier',
            'any.required': 'Le statut est obligatoire'
        })
    });
    return incidentsSchema.validate(body)
}

export default incidentsValidation