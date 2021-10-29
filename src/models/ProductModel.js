const connection = require('../database/connection');

module.exports ={ 

  async create(product){
      
    const result = await connection('product').insert(product);
    return result;
  },

  async getById(product_id){
    const result = await connection('product')
      .where({product_id})
      .select('*');

    return result;
  },

  //Acha e retorna o produto pela categoria
  async getByCategoria(product_categoria){
    const result = await connection('product')
      .where({product_categoria})
      .select('*');

    return result;
  },

  //Acha e retorna o produto por cat E subcat
  async getByCatSubcat({ product_categoria, product_subcategoria}){
    const result = await connection('product')
      .where({
        product_categoria, product_subcategoria
      })
      .select('*');
    return result;
  },

  async updateById(product_id, product){
    const result = await connection('product')
      .where({product_id})
      .update(product); 
    return result;
  },

  async deleteById(product_id){
    const result = await connection('product')
      .where({product_id})
      .delete();
    return result;
  }

}