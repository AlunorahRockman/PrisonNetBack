import Joi from 'joi'

const visiteValidation = (body) => {
    const visitesSchema = Joi.object({
        visiteurId: Joi.number().integer().required().messages({
            'number.base': 'L\'idVisiteur doit être un nombre entier',
            'any.required': 'L\'idVisiteur est obligatoire'
        }),
        detenuId: Joi.number().integer().required().messages({
            'number.base': 'L\'idDetenus doit être un nombre entier',
            'any.required': 'L\'idDetenus est obligatoire'
        }),  
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
        }),
        statut: Joi.number().integer().required().messages({
            'number.base': 'Le statut doit être un nombre entier',
            'any.required': 'Le statut est obligatoire'
        })
    });
    return visitesSchema.validate(body)
}

export default visiteValidation