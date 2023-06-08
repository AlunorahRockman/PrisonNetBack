import Joi from 'joi'

const emailValidation = (body) => {
    const emailShema = Joi.object({
        email: Joi.string().min(6).max(40).trim().required().email().messages({
            'string.base': 'L\'email doit être une chaîne de caractères',
            'string.empty': 'L\'email ne doit pas être vide',
            'string.min': 'L\'email doit contenir au moins {#limit} caractères',
            'string.max': 'L\'email doit contenir au plus {#limit} caractères',
            'string.email': 'L\'email doit être une adresse email valide',
            'any.required': 'L\'email est obligatoire'
        })
    });
    return emailShema.validate(body)
}

export default emailValidation