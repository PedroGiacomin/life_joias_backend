const ProductModel = require('../models/ProductModel');

module.exports = {

  //Cria produto com JSON passado no body
  //Retorna a 'product_id' do produto criado
  async create(request, response){
    try{
      
      const newProduct = request.body;
      const result = await ProductModel.create(newProduct);  
      return response.status(200).json(result);  

    }catch(error){
      console.warn("Product creation failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to create Product"
      })
    }
  },

  //Att informacoes do produto passado no params a partir de um JSON passado no body
  async update(request, response){
    try{
      const {product_id} = request.params;
      const newProduct = request.body;

      await ProductModel.updateById(product_id, newProduct);

      return response.status(200).json({ "notification" : "Product updated successfully"});

    }catch(error){
      console.warn("Product update failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to update Product"
      })
      
    }
  },

  async getById(request, response){
  
  },

  async getByCategoria(request, response){
  
  },


  async getByCatSubcat(request, response){
  
  },


  async delete(request, response){
  
  }




}