const UserModel = require('../models/UserModel');
const Firebase = require('../utils/Firebase');

module.exports = {

  async create(request, response){
   try{
     const user = request.body;

     const uid = Firebase.createNewUser(user.user_email, user.user_senha);

     delete user.user_senha;
     user.firebase_id = uid;

     const result = await UserModel.create(user);

     return response.status(200).json(result);
   }
   catch (error){
      console.log("User creation failed: " + error);
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
    catch (error){
      console.log("User update failed: " + error);
      return response.status(500).json({
        notification: "Internal serve error while trying to update User",
      });
    }
  },

  async getById(request, response){
   try{
      const {user_id} = request.params;
      const result = await UserModel.getById(user_id);

      return response.status(200).json(result);
    }
    catch (error){
      console.log("User getById failed: " + error);
      return response.status(500).json({
        notification: "Internal server error while tryibg to get User",
      });
    }
  },

  async getByEmail(request, response){
    try{
      console.log(request.query);
      
      const {user_email} = request.query;
      const result = await UserModel.getByEmail(user_email);
      console.log(result);

       return response.status(200).json(result);
     }
     catch (error){
       console.log("User getByEmail failed: " + error);
       return response.status(500).json({
         notification: "Internal server error while trying to get User by email",
       });
     }
   },

  async delete(request, response){
    try{
      const {user_id} = request.params;
      const result = await UserModel.deleteById(user_id);
      return response.status(200).json(result);
    }
    catch (error){
      console.log ("User delete failed: " + error);
      return response.status(500).json({
        notification: "Internal server error while trying to delete User",
      });
    }
  },

}; 