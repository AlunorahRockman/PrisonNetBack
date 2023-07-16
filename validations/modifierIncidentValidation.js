import Joi from 'joi'

const modifierIncidentValidation = (body) => {
    const incidentsSchema = Joi.object({
        description: Joi.string().trim().required().messages({
            'string.base': 'Le description doit être une chaîne de caractères',
            'string.empty': 'Le description de l\'incident ne doit pas être vide',
            'any.required': 'Le description de l\'incident est obligatoire'
        }),
        date: Joi.date().required().messages({
            'date.base': 'La date doit être une date valide',
            'any.required': 'La date est obligatoire'
        })
    });
    return incidentsSchema.validate(body)
}

export default modifierIncidentValidation