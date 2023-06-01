import Joi from 'joi'

const codeValidation = (body) => {
    const codeSchema = Joi.object({
        idUser: Joi.number().integer().required().messages({
            'number.base': 'L\'idUser doit être un nombre entier',
            'any.required': 'L\'idUser est obligatoire'
        }),
        code: Joi.number().integer().min(10000).max(99999).required().messages({
            'number.base': 'Le code doit être un nombre entier',
            'number.min': 'Le code doit avoir une valeur minimale de 10000',
            'number.max': 'Le code doit avoir une valeur maximale de 99999',
            'any.required': 'Le code est obligatoire'
        })
    });
    return codeSchema.validate(body)
}

export default codeValidation