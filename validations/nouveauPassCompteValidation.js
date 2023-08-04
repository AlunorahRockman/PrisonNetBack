import Joi from 'joi'

const nouveauPassCompteValidation = (body) => {
    const nouveauPassShema = Joi.object({
        userId: Joi.number().integer().required().messages({
            'number.base': 'L\'idUser doit être un nombre entier',
            'any.required': 'L\'idUser est obligatoire'
        }),
        motdepasseActuel: Joi.string().min(8).max(10).trim().required().messages({
            'string.base': 'Le mot de passe actuel doit être une chaîne de caractères',
            'string.empty': 'Le mot de passe actuel ne doit pas être vide',
            'string.min': 'Le mot de passe actuel doit contenir au moins {#limit} caractères',
            'string.max': 'Le mot de passe actuel doit contenir au plus {#limit} caractères',
            'any.required': 'Le mot de passe actuel est obligatoire'
        }),
        nouveauPass: Joi.string().min(8).max(10).trim().required().messages({
            'string.base': 'Le nouveau mot de passe doit être une chaîne de caractères',
            'string.empty': 'Le nouveau mot de passe ne doit pas être vide',
            'string.min': 'Le nouveau mot de passe doit contenir au moins {#limit} caractères',
            'string.max': 'Le nouveau mot de passe doit contenir au plus {#limit} caractères',
            'any.required': 'Le nouveau mot de passe est obligatoire'
        }),
        confirmPass: Joi.string().min(8).max(10).trim().required().messages({
            'string.base': 'Le mot de passe de confirmation doit être une chaîne de caractères',
            'string.empty': 'Le mot de passe de confirmation ne doit pas être vide',
            'string.min': 'Le mot de passe de confirmation doit contenir au moins {#limit} caractères',
            'string.max': 'Le mot de passe de confirmation doit contenir au plus {#limit} caractères',
            'any.required': 'Le mot de passe de confirmation est obligatoire'
        }),
    });
    return nouveauPassShema.validate(body)
}

export default nouveauPassCompteValidation