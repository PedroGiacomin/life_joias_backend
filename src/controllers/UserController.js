const UserModel = require('../models/UserModel');

module.exports = {

  async create(request, response){
   try{
     const user = request.body;
     const result = await UserModel.create(user);
     return response.status(200).json(result);
   }
   catch (err){
      console.log("User creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create User",
      });
   }
  },

  //Att informacoes do produto
  async update(request, response){
    try{
      const {user_id} = request.params;
      const user = request.body;
      const result = await UserModel.updateById(user_id, user);

      return response.status(200).json(result);
    }
    catch (err){
      console.log("User update failed: " + err);
      return response.status(500).json({
        notification: "Internal serve error while trying to update User",
      });
    }
  },

  async getById(request, response){
   try{
      const {user_id} = request.params;
      const result = await User.getById(user_id);

      return response.status(200).json(result);
    }
    catch (err){
      console.log("User getById failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while tryibg to get User",
      });
    }
  },

  async delete(request, response){
    try{
      const {user_id} = request.params;
      const result = await UserModel.deleteById(user_id);
      return response.status(200).json(result);
    }
    catch (err){
      console.log ("User delete failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete User",
      });
    }
  },

}; 