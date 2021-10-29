
exports.up = function(knex) {
  return knex.schema.createTable('product', function(table){
    
    table.increments('product_id').primary().notNullable();
    table.string('product_nome').notNullable();
    table.decimal('product_preco', 2).notNullable();
    table.integer('product_tamanho').nullable();
    table.string('product_imagem').notNullable();
    table.string('product_descricao').notNullable();
    table.string('product_categoria').notNullable();
    table.string('product_subcategoria').notNullable(); 
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
