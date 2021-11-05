const connection = require('../database/connection');
const {v4: uuidv4} = require('uuid');

module.exports = {

  //Cria um user no DB, o user 
  async create(user){
    
   const user_id = uuidv4();
   user.user_id = user_id;

   await connection('user').insert(user);
   
   return user_id;
   /**
     * 'user' eh um objeto JSON que estah sendo inserido na tabela, 
     * nele tem todos os campos das colunas da tabela 'user' 
     */
  },

  //Retorna um objeto JSON
  async getById(user_id){
    const result = await connection('user')
      .where({user_id : user_id})
      .select('*');
    //O where precisa especificar a coluna e o valor que se procura nela
    //O select define quais colunas desse cliente vc quer receber

    return result;
  },

  //Retorna um objeto JSON
  async updateById(user_id, user){
    const result = await connection('user')
      .where({user_id}) 
      .update(user); //user eh um objeto json

    return result;
  },

  async deleteById(user_id){
    const result = await connection('user')
      .where({user_id})
      .delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('user')
      .where(fields)
      .select("*")
      .first();
    return result;
  },

  async getByEmail(user_email){
    const result = await connection('user')
      .where({user_email})
      .select('*');

      return result;
  }
}