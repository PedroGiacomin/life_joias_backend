const ProductModel = require('../models/ProductModel');

module.exports = {

  //Criar novo produto
  async create(request, response){
    try{
      
      const newProduct = request.body;
      const result = await ProductModel.create(newProduct);  //Chama a funcao DO MODEL para criar no banco de dados
      return response.status(200).json(result);    // O sqlite por padrao retorna o id quando cria

    }catch(error){
      console.warn("Product creation failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to create Product"
      })
    }
  },

  //Att informacoes do produto
  async update(request, response){
    try{

      //O id eh passado na rota como /:id 
      const {produto_id} = request.params;
      const newProduto = request.body;

      await ProdutosModel.updateById(produto_id, newProduto);

      return response.status(200).json({ "notification" : "Product updated successfully"});

    }catch(error){
      console.warn("Product update failed: ", error)
      
      return response.status(500).json({
        notification: "Internal server error while trying to update Produto"
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