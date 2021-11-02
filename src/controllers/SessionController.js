const Firebase = require("../utils/Firebase"); 
const jwt = require("jsonwebtoken"); 
const UserModel = require("../models/UserModel"); 
 
module.exports = { 
  async signIn(request, response){ 
    try { 
      const{ user_email, user_senha } = request.body; 
      
      let firebaseId; 
      try { 
        firebaseId = await Firebase.login(user_email, user_senha); 
      } catch (error) { 
        console.warn(error); 
        return response 
        .status(403) 
        .json({ notification: "Invalid Credentials"}); 
      } 
 
      const user = await UserModel.getByFields({ firebase_id: firebaseId }); 
 
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET,{ 
        expiresIn: "30d", 
      }); 
 
           
    return response.status(200).json({ user, accessToken }); 
    } catch (error) { 
      return response 
        .status(500) 
        .json({message: "Error while trying to validate credentials"}); 
    } 
  }, 
};