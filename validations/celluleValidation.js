import Joi from 'joi'

const celluleValidation = (body) => {
    const celluleShema = Joi.object({
        numero: Joi.number().integer().required().messages({
            'number.base': 'Le numero doit être un nombre entier',
            'any.required': 'Le numero est obligatoire'
        }),
        capaciteMax: Joi.number().integer().required().messages({
            'number.base': 'Le capacité maximale doit être un nombre entier',
            'any.required': 'Le capacité maximale est obligatoire'
        }),
        superficie: Joi.number().integer().required().messages({
            'number.base': 'La superficie doit être un nombre entier',
            'any.required': 'La superficie est obligatoire'
        }),
        statut: Joi.number().integer().required().messages({
            'number.base': 'Le statut doit être un nombre entier',
            'any.required': 'Le statut est obligatoire'
        })
    });
    return celluleShema.validate(body)
}

export default celluleValidation