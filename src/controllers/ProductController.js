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
    try{
      const {product_id} = request.params;
      const result = await ProductModel.getById(product_id);

      //Nao deu certo rs
      if(result == []){
        return response.status(400).json({ notification : "Product not found"});
      }

      return response.json(result);

    }catch(error){

      console.warn("Product request failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to get Produto"
      })
    }
  },

  //Filtro bem gambiarrado aqui
  async getByCategoria(request, response){
    try{
      const {product_categoria, product_subcategoria} = request.query;
      
      let result = {};
      if(typeof {product_categoria, product_subcategoria}['product_subcategoria'] == 'undefined'){
        result = await ProductModel.getByCategoria(product_categoria);
      }
      else{
        result = await ProductModel.getByCategoriaWithFilter(product_categoria, {product_subcategoria});
      }
      
      return response.json(result);

    }catch(error){

      console.warn("Product request failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to get Product by Categoria"
      })
    }
  },

  async delete(request, response){
    try{
      const {product_id} = request.params;
      const result = await ProductModel.deleteById(product_id);
            
      //Nao deu certo rs
      if(result == 0){
        return response.status(400).json({ notification : "Product not found"});
      }

      return response.json(result);

    }catch(error){

      console.warn("Product deletion failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to delete Product"
      })
    }
  }
}