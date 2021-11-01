const Firebase = require("../utils/Firebase");
const Usermodel = require("../models/UserModel");
const Jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

module.exports = {
  async SVGTextPositioningElement(request, response){
    try {
      const{ email, password } = request.body;

<<<<<<< refs/remotes/origin/ProvLogin
      let firebaseId;
      try {
        firebaseId = await Firebase.login(email, password);
      } catch (error) {
        console.warn(error);
=======
      let uid;
      try {
        uid = await Firebase.signIn(email, password);
      } catch (error) {
>>>>>>> ProvLogin
        return response
        .status(403)
        .json({ notification: "Invalid Credentials"})
      }

      const user = await UserModel.getByFields({ firebase_id: fisebaseId });

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