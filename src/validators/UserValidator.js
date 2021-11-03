const { celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_nome:Joi.string().required(),
            user_email:Joi.string().email().required(),
            user_telefone:Joi.string().required(),
            user_nascimento:Joi.string().required(),
            user_cep:Joi.string().required(),
            user_rua:Joi.string().required(),
            user_numero:Joi.string().required(),
            user_bairro:Joi.string().required(),
            user_cidade:Joi.string().required(),
            user_estado:Joi.string().required(),
            user_senha:Joi.string().required()
        }),

    }),

    getById: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),

        }),
    }),

    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
        }),

        [Segments.BODY]: Joi.object().keys({
            user_nome:Joi.string().optional(),
            user_email:Joi.string().optional(),
            user_telefone:Joi.string().optional(),
            user_nascimento:Joi.string().optional(),
            user_cep:Joi.string().optional(),
            user_rua:Joi.string().optional(),
            user_numero:Joi.string().optional(),
            user_bairro:Joi.string().optional(),
            user_cidade:Joi.string().optional(),
            user_estado:Joi.string().optional(),
            user_senha:Joi.string().optional()
        })
        . min(1),
     }),
     
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),}),
    }),

}