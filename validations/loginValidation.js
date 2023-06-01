import Joi from "joi"

const loginValidation = (body) => {
    const loginSchema = Joi.object({
            email: Joi.string().min(6).max(40).trim().required().email().messages({
                'string.base': 'L\'email doit être une chaîne de caractères',
                'string.empty': 'L\'email ne doit pas être vide',
                'string.min': 'L\'email doit contenir au moins {#limit} caractères',
                'string.max': 'L\'email doit contenir au plus {#limit} caractères',
                'string.email': 'L\'email doit être une adresse email valide',
                'any.required': 'L\'email est obligatoire'
            }),
            motdepasse: Joi.string().min(8).max(10).trim().required().messages({
                'string.base': 'Le mot de passe doit être une chaîne de caractères',
                'string.empty': 'Le mot de passe ne doit pas être vide',
                'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
                'string.max': 'Le mot de passe doit contenir au plus {#limit} caractères',
                'any.required': 'Le mot de passe est obligatoire'
            })
        })
    return loginSchema.validate(body)
}

export default loginValidation