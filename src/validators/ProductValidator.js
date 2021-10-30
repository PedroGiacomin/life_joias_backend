const { celebrate, Joi, Segments} = require('celebrate');

module.exports = {
  create: celebrate({
    //Coloca a parte que quer validar
    [Segments.BODY]: Joi.object().keys({
      product_nome : Joi.string().required(),
      product_preco : Joi.number().required(),
      product_tamanho : Joi.number().integer().optional(),
      product_imagem : Joi.string().required(),
      product_descricao : Joi.string().required(),
      product_categoria : Joi.string().required(),
      product_subcategoria: Joi.string().required()
    }) 
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      product_id : Joi.number().integer().required(), 
    })
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      product_id : Joi.number().integer().required(), 
    }),

    [Segments.BODY]: Joi.object().keys({
      product_nome : Joi.string().optional(),
      product_preco : Joi.number().optional(),
      product_tamanho : Joi.number().integer().optional(),
      product_imagem : Joi.string().optional(),
      product_descricao : Joi.string().optional(),
      product_categoria : Joi.string().optional(),
      product_subcategoria: Joi.string().optional()
    }).min(1)
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      product_id : Joi.number().integer().required(), 
    })
  }),

  getByCategoria: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      product_categoria: Joi.string().optional(),
      product_subcategoria: Joi.string().optional()
    })
  }),

  getByCategoriaWithFilter: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      product_categoria: Joi.string().optional(),
      product_subcategoria: Joi.string().optional()
    })
  })


  
}