const { celebrate, Joi, Segments} = require('celebrate');

module.exports = {
  create: celebrate({
    //Coloca a parte que quer validar
    [Segments.BODY]: Joi.object().keys({
      product_nome : Joi.string().required(),
      product_preco : Joi.number().required(),
      product_tamanho : Joi.number().integer(),
      product_imagem : Joi.string().required(),
      product_descricao : Joi.string().required(),
      product_categoria : Joi.string().required(),
      product_subcategoria: Joi.string().required()
    }) 
  }),

  
}