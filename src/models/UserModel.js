const connection = require('../database/connection');

module.exports = {

  //Cria um user no DB, o user 
  async create(user){
    
    //Cria um id complexo para o cliente
   const user_id = uuidv4();
   user.id = user_id;

   await connection('user').insert(user);
   
   return user_id;
   /**
     * 'user' eh um objeto JSON que estah sendo inserido na tabela, 
     * nele tem todos os campos das colunas da tabela 'user' 
     */
 },




}