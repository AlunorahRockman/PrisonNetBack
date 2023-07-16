import Joi from 'joi'

const modifierVisiteValidation = (body) => {
    const visitesSchema = Joi.object({
        dateVisite: Joi.date().required().messages({
            'date.base': 'La date de visite doit être une date valide',
            'any.required': 'La date de visite est obligatoire'
        }),
        description: Joi.string().trim().required().messages({
            'string.base': 'Le description doit être une chaîne de caractères',
            'string.empty': 'Le description de l\'incident ne doit pas être vide',
            'any.required': 'Le description de l\'incident est obligatoire'
        }),
        heure: Joi.number().integer().required().messages({
            'number.base': 'L\'heure doit être un nombre entier',
            'any.required': 'L\'heure est obligatoire'
        })
    });
    return visitesSchema.validate(body)
}

export default modifierVisiteValidation